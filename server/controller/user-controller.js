import User from "../schemas/user-schema.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import BlackList from "../schemas/blacklist-schema.js";
import mongoose from "mongoose";
import { INTERNAL_SERVER_ERROR } from "../Constants/response.js";
import user from "../schemas/user-schema.js";


dotenv.config();

let options = {
                maxAge: 660000, // would expire after 10 minutes
                sameSite: 'none',
                secure:true,
                httpOnly: false, // The cookie only accessible by the web server
                signed: false // Indicates if the cookie should be signed */
              }

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.EXP_TIME }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email
    },
    process.env.JWT_SECRET,
    { expiresIn: '10m' }
  );
};

const findCurrentToken = async (id,refreshToken) => {
  try {
    const {sessions} = await User.findOne(
      {_id:mongoose.Types.ObjectId(id)},
      {
        sessions:{$elemMatch:{refreshToken:refreshToken}}
      }
    ).lean();  
    return sessions; 
  } catch (error) {
    console.log("Error is: ", error);
    return null;
  }
};

const expireToken = async (id, refreshToken) => {
  try {
    await BlackList.findOneAndUpdate(
      {
        user_id: mongoose.Types.ObjectId(id),
      },
      {
        $push: { expiredTokens: refreshToken},
      },
      { upsert: true }
    );
    await clearCurrentToken(id,refreshToken);
    return true;
  } catch (error) {
    console.log("Error is: ", error);
  }
  return false;
};

const modifyUserInfo = async (id, token) => {
  try {
    const result=await User.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(id),
      },
      {
        $push: {
          sessions:{
            refreshToken: token
          }
        },
      },
      {
        new: true,
      }
    );
    console.log(result); 
    return true;
  } catch (error) {
    console.log("Error is:", error);
  }
  return false;
};

const addReferrals = async (referredId, referreId, username) => {
  const user = await User.findOneAndUpdate(
    {
      _id: referredId,
    },
    {
      $push: {
        referrals: {
          referreId: mongoose.Types.ObjectId(referreId),
          username: username,
        },
      },
    },
    {
      new: true,
    }
  );
  // console.log(referredId+" "+referreId)
  return user;
};

const getIdAndOrderfromUsername = async (name) => {
  const user = await User.findOne(
    {
      username: name,
    },
  );
  return user;
};

const checkTokenInBlackList = async (token, userId) => {
  const response = await BlackList.findOne({
    user_id: mongoose.Types.ObjectId(userId),
    expiredTokens: token,
  });
  if (response) return true;
  return false;
};

const getReferralsfromUserId = async (id) => {
  const res = await User.findOne(
    {
      _id: mongoose.Types.ObjectId(id),
    },
    { _id: 0, referrals: 1 }
  );
  return res;
};

const getIdfromReferralCode = async (referralCode) => {
  const res = await User.findOne({
    referralCode: referralCode,
  });

  return res;
};

const getOrders = async (userIds) => {
  const orders = await User.find(
    {
      _id: { $in: userIds },
    },
    {
      _id: 0,
      orders: 1,
    }
  );
  return orders;
};


const clearCurrentToken=async(id,refreshToken)=>{
  try {
    await User.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(id),
      },
      {
        $pull: {
          sessions:{refreshToken:refreshToken}
        },
      }
    );
  } catch (error) {
    console.log("Error is:", error);
  }
}

export const signUp = async (request, response) => {
  try {
    const existingUser = await User.findOne({
      email: request.body.email,
    });
    if (existingUser) {
      return response.status(200).json({ message: "already exists" });
    }
    const newUser = request.body;
    const password = await bcrypt.hash(request.body.password, 10);
    const modifiedUser = { ...newUser,fullName:newUser.name,password };
    const user = new User(modifiedUser);
    await user.save();
    return response.status(200).json({ message: "successfully signed up" });
  } catch (error) {
    console.log("Error is: ", error);
    return response.status(500).json({ error: INTERNAL_SERVER_ERROR});
  }
};

export const login = async (request, response) => {
  try {
    const user = await User.findOne({
      email: request.body.email,
    });
    if (user) {
      const decryptedPassword = bcrypt.compareSync(
        request.body.password,
        user.password
      );
      const refreshToken = generateRefreshToken(user);
      const accessToken = generateAccessToken(user);
      delete user._doc.password;
      const modified=await modifyUserInfo(user._id, refreshToken);
      if(modified && decryptedPassword){
        response.cookie('_at', accessToken,{...options,httpOnly:true,maxAge:240000});
        response.cookie('_rt', refreshToken,options);
      }
      return response.json({ message:"ok",...user._doc});  
    }else {
      return response
        .status(401)
        .json({  message: "Invalid username/password"  });
    }
  } catch (error) {
    console.log("Error is: ", error);
    return response.status(500).json({ error: INTERNAL_SERVER_ERROR });
  }
};

export const verifyToken = async (request, response, next) => {
  const refreshToken = request.cookies._rt;
  const accessToken=request.cookies._at;
  let expired=false; 
  if (refreshToken) { 
    try {
      if (refreshToken!=="null" && accessToken!=="null") {
        const { id,exp } = jwt.decode(refreshToken);
        const sessions=await findCurrentToken(id,refreshToken);
        if(sessions[0].refreshToken!==refreshToken || Date.now() > new Date(exp*1000)){
          await expireToken(id,refreshToken,accessToken);
          expired=true;
        } 
        if(expired){ 
          log.info("expired")
          response.clearCookie("_at");
          response.clearCookie("_rt");
          return response.status(401).json({
            message: "Invalid creds!", 
          }); 
        }
        if(accessToken) 
        { 
          const {exp:aExp}=jwt.decode(accessToken); 
          if(Date.now() > new Date(aExp*1000)){
              const user = await User.findOne({
                _id: mongoose.Types.ObjectId(id)
              });
              const accessToken=generateAccessToken(user);
              // let options = {
              //   maxAge: 300000, // would expire after 15 minutes
              //   sameSite: 'none',
              //   secure:true,
              //   httpOnly: true, // The cookie only accessible by the web server
              //   signed: false // Indicates if the cookie should be signed */
              // }
        
              // Set cookie
              response.cookie('_at', accessToken,{...options,maxAge:240000,httpOnly:true});
              request.user={id,accessToken};
              next();
          }else{         
           response.cookie('_at', accessToken,{...options,maxAge:240000,httpOnly:true});
            request.user={id,accessToken};
            next();
         }
        }else{
          const accessToken=generateAccessToken(user);
          response.cookie('_at', accessToken,{...options,maxAge:240000,httpOnly:true});
          request.user={id,accessToken};
          next();
       }
           
       /*  const inBlackList = await checkTokenInBlackList(token, id);
        if (inBlackList) {
          if(Date.now() > new Date(exp*1000)){
            await BlackList.updateOne({user_id:mongoose.Types.ObjectId(id)},{$pull:{expiredTokens:{$in:token}}});
          }
          return response.status(401).json({
            message: "Token is not valid!",
          });
        } else {
          };*/
          
      }
    }catch (error) {
      console.log("Error is: ", error);
      return response.status(500).json({ error:INTERNAL_SERVER_ERROR});
    }
  } else{
    return response.status(401).json({ message: "You are not authenticated!" });
  }
};


export const addReferralLink = async (request, response) => {
  try{
    const authCode = request.headers.authorization.split(" ")[1];
    const { id } = jwt.decode(authCode);
    const referralCode = request.body.referralCode;
    // console.log(referralCode)
    const result = await User.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(id),
      },
      {
        referralCode: referralCode,
      },{
        new:true
      }
      );
    return response.status(200).json("referral added successfully")
  }catch(err){
    console.error(err);
    return response.status(500).json({error:INTERNAL_SERVER_ERROR})
  }
};

export const addReferral = async (request, response) => {
  try {
    const { referralCode } = request.body;
    const authCode = request.headers.authorization.split(" ")[1];
    const { id, username } = jwt.decode(authCode);
    let userInfo = "";
    if (referralCode.indexOf("#") !== -1) {
      const userName = referralCode.replace(/[0-9]+/, "").split("#")[1];
      userInfo = await getIdAndOrderfromUsername(userName.toLowerCase());
    } else {
      userInfo = await getIdfromReferralCode(referralCode);
      // console.log(userInfo)
    }
    await addReferrals(userInfo._id, id, username);
    return response
      .status(200)
      .json({ message: "referral added successfully." });

    // console.log("in else case");
  } catch (err) {
    console.log(err);
    return response.status(500).json({ error: INTERNAL_SERVER_ERROR});
  }
};

export const getEarnings = async (request, response) => {
  try{
  const authCode = request.headers.authorization.split(" ")[1];
  const { id } = jwt.decode(authCode);
  const { referrals } = await getReferralsfromUserId(id);
  // console.log(referrals)
  if (referrals) {
    const ids = referrals.map((val) => val.referreId);
    const orders = await getOrders(ids);
    const orderValues = orders
      .reduce((arr, val) => arr.concat(val.orders), [])
      .map((val) => val.products)
      .flat(2)
      .filter((val) => val.status === "delivered")
      .map((val) => val.orderValue);
    const earnings = Math.round(
      orderValues.reduce((totalValue, value) => (totalValue += value), 0) *
        (7 / 100)
    );
    return response.status(200).json({ earnings: earnings });
  } else {
    return response.status(200).json({ message: "No referrals found" });
  }
}catch(err){
  console.log(err);
  return response.status(500).json({ error: INTERNAL_SERVER_ERROR});
}
};
 
export const getReferrals = async (request, response) => {
  try {
    const authCode = request.headers.authorization.split(" ")[1];
    const { id } = jwt.decode(authCode);
    const res = await User.findOne({
      _id: mongoose.Types.ObjectId(id),
    });
    // console.log(res);
    return response.status(200).json({ referrals: res.referrals });
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .json({ error: INTERNAL_SERVER_ERROR });
  }
};

export const addOrder = async (request, response) => {
  try {
    const products = request.body.products;
    if (products) {
      const authCode = request.headers.authorization.split(" ")[1];
      const { id } = jwt.decode(authCode);
      const orderedProducts = products.map((val) => {
        return { ...val, status: "" ,productId:mongoose.Types.ObjectId(val.productId)};
      });
      // console.log(orderedProducts)
      const result = await User.findOneAndUpdate(
        {
          _id: mongoose.Types.ObjectId(id),
        }, 
        {
          $push: {
            orders: {
              //add orderDate and deliveryDate fields and trackingId--DONE
              orderId: new mongoose.Types.ObjectId(),
              orderDate:new Date(),
              deliveryDate:"",
              trackingId:new mongoose.Types.ObjectId(),
              products: orderedProducts,
            },
          },
        },
        { new: true }
      );
      // console.log(result);
    }
    return response.status(200).json({ message: "ok" });
  } catch (err) {
    console.log(err);
    return response
      .status(500)
      .json({ error: INTERNAL_SERVER_ERROR });
  }
};

export const logout = async (request, response) => {
  try {
    const refreshToken = request.cookies._rt;
    const accessToken=request.cookies._at;
    if (refreshToken && accessToken) {
      let expirySuccessful=false;
      const {id}=jwt.decode(accessToken);
      const session = await findCurrentToken(id,refreshToken);
      await expireToken(id, session[0].refreshToken,accessToken).then(()=>{expirySuccessful=true; console.log(expirySuccessful) })   
      if (expirySuccessful){
          response.clearCookie("_at");
          response.clearCookie("_rt");
          return response.status(200).json({ message: "Succesfully logged out!" });
      }else{
          return response.status(500).json({ error: INTERNAL_SERVER_ERROR } );
      }
    } else {
      return response
        .status(401)
        .json({ message: "You are not authenticated!" });
    }
  } catch (err) {
    console.log(err);
    return response.status(500).json({ error: INTERNAL_SERVER_ERROR } );
  }
};

export const clearBlackList=async()=>{
  let expiredTokens=await BlackList.find({},{expiredTokens:1,_id:0});
  if(expiredTokens && expiredTokens.length>0){
    expiredTokens.map((expiredToken)=>expiredToken.expiredTokens).flat(1).forEach(async(val)=>{
      if(val!==null){
      const {id,exp}=jwt.decode(val);
      if(Date.now() > new Date(exp*1000)){
        const {acknowledged}=await BlackList.updateOne({user_id:mongoose.Types.ObjectId(id)},{$pull:{expiredTokens:val}},{safe:true});
        if (acknowledged){
          console.log(`deleted token`)
        } 
      }else{
        console.log("no expiredTokens found")
      }
    } 
    });
  }else{
    console.log("no expiredTokens remaining to be cleared")
  }
}
  