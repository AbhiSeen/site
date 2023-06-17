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
  maxAge: 720000, // would expire after 10 minutes
  sameSite: "none",
  secure: true,
  httpOnly: true, // The cookie only accessible by the web server
  signed: false, // Indicates if the cookie should be signed */
};

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      fullName:user.fullName
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
    { expiresIn: "10m" }
  );
};

const findCurrentToken = async (id, refreshToken) => {
  try {
    const result = await User.findOne(
      { _id: mongoose.Types.ObjectId(id) },
      {
        sessions: { $elemMatch: { refreshToken: refreshToken } },
      },
      { _id: 0 }
    ).lean();
    return result;
  } catch (error) {
    console.error("Error is: ", error);
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
        $push: { expiredTokens: refreshToken },
      },
      { upsert: true }
    );
    await clearCurrentToken(id, refreshToken);
    return true;
  } catch (error) {
    console.log("Error is: ", error);
  }
  return false;
};

const modifyUserInfo = async (id, token) => {
  try {
    const result = await User.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(id),
      },
      {
        $push: {
          sessions: {
            refreshToken: token,
          },
        },
      },
      {
        new: true,
      }
    );
    return true;
  } catch (error) {
    console.log("Error is:", error);
  }
  return false;
};

const addReferrals = async (referredId, referreId, email) => {
  const user = await User.findOneAndUpdate(
    {
      _id: referredId,
    },
    {
      $push: {
        referrals: {
          referreId: mongoose.Types.ObjectId(referreId),
          email,
        },
      },
    },
    {
      new: true,
    }
  );
  return user;
};

const getIdAndOrderfromID= async (userID) => {
  const user = await User.find({
    fullName: {$regex:userID,$options: "i"},
  }).lean();
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
  return res.referrals;
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

const clearCurrentToken = async (id, token) => {
  try {
    const result=await User.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(id),
      },
      {
        $pull: {
          sessions: { refreshToken: token },
        },
      }
    );
  } catch (error) {
    console.log("Error is:", error);
  }
};

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
    const modifiedUser = { ...newUser, fullName: newUser.name, password };
    const user = new User(modifiedUser);
    await user.save();
    return response.status(200).json({ message: "successfully signed up" });
  } catch (error) {
    console.log("Error is: ", error);
    return response.status(400).json({ error: INTERNAL_SERVER_ERROR });
  }
};

export const login = async (request, response) => {
  try {
    const user = await User.findOne({
      email: request.body.email,
    });
    if (user) {
      const decryptedPassword =bcrypt.compareSync(request.body.password, user.password);
      const refreshToken = generateRefreshToken(user);
      const accessToken = generateAccessToken(user);
      delete user._doc.password;
      const modified = await modifyUserInfo(user._id, refreshToken);
      if (modified && decryptedPassword) {
        response.cookie("_at", accessToken, { ...options,httpOnly:false,maxAge:240000});
        response.cookie("_rt", refreshToken, options);
        return response.json({ message: "ok", ...user._doc });
      }else {
        return response.status(401).json({ message: "Invalid username/password" });
      }
    } else {
      return response.status(401).json({ message: "Invalid username/password" });
    }
  } catch (error) {
    console.log("Error is: ", error.message);
    return response.status(400).json({ error: INTERNAL_SERVER_ERROR });
  }
};

export const refreshTokens = async (request, response) => {
  const accessToken = request.cookies._at;
  if (accessToken) {
    try {
      let newAccessToken = "";
      const { exp: aExp,id } = jwt.decode(accessToken);
      if (Date.now() > new Date(aExp * 1000)) {
        const user = await User.findOne({
          _id: mongoose.Types.ObjectId(id),
        });
        newAccessToken = generateAccessToken(user);
        response.cookie("_at", newAccessToken, { ...options, httpOnly: false,maxAge:240000 });
      } else {
        response.cookie("_at", accessToken, { ...options, httpOnly: false,maxAge:240000 });
      }
      return response.status(200).json({ message: "ok" });
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
    } catch (error) {
      console.log("Error is: ", error.message);
      return response.status(400).json({ error: error.message || INTERNAL_SERVER_ERROR });
    }
  } else {
    return response.status(401).json({ error: "You are not authenticated!" });
  }
};

export const verifyToken = async (request, response, next) => {
  try{
    const refreshToken = request.cookies._rt;
    const accessToken=request.cookies._at;
    let expired = false;
    if (refreshToken ) {
      jwt.verify(refreshToken, process.env.JWT_SECRET,async(err,decodedPayload)=>{
        const { id, exp } = jwt.decode(refreshToken);
        if (decodedPayload) {
          const sessions = await findCurrentToken(id, refreshToken);
          if (
            sessions.sessions[0].refreshToken !== refreshToken || 
            Date.now() > new Date(exp * 1000)
          ) {
            await expireToken(id, refreshToken);
            expired = true;
          }
          if (expired) {
            response.clearCookie("_at");
            response.clearCookie("_rt");
            return response.status(401).json({
              message: "Invalid creds!",
            });
          } else {
            request.user = { id, refreshToken,accessToken };
            next();
          }
        } else {
          expireToken(id,refreshToken).then(()=>console.log("expired token"));
          response.clearCookie("_at");
          response.clearCookie("_rt");
          return response.status(200).json({message: "Logged out due to expiry"});
        }
      })
    }else {
      response.clearCookie("_at");
      response.clearCookie("_rt");
      throw new Error("Invalid creds!");
    }
  }catch(error){
    console.log(error.message);
    return response.status(400).json({message: error.message || INTERNAL_SERVER_ERROR});
  } 
};

export const addReferralLink = async (request, response) => {
  try {
    const authCode = request.user.refreshToken;
    const { id } = jwt.decode(authCode);
    const referralCode = request.body.referralCode;
    // console.log(referralCode)
    const result = await User.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(id),
      },
      {
        referralCode: referralCode,
      },
      {
        new: true,
      }
    );
    return response.status(200).json("referral added successfully");
  } catch (err) {
    console.error(err);
    return response.status(400).json({ error: INTERNAL_SERVER_ERROR });
  }
};

export const addReferral = async (request, response) => {
  try {
    const { user } = request.body;
    const authCode = request.user.accessToken;
    const refreshToken=request.user.refreshToken;
    const { id } = jwt.decode(authCode);
    const {email} =jwt.decode(refreshToken);
    const referrals=await getReferralsfromUserId(id);
    if(referrals && user){
        const referralID=user.referralCode.split("#")[0];
        const userInfo = await getIdAndOrderfromID(referralID);
        if(userInfo && referrals && userInfo[0]._id.equals(referrals[0].referreId)){
          return response.status(200).json({ message: "Already added" });
        }else{
          const referralID=user.referralCode.split("#")[0];
          const userInfo = await getIdAndOrderfromID(referralID);
          if(userInfo && userInfo[0].fullName?.substring(0,5).toUpperCase()===referralID){
            await addReferrals(userInfo[0]._id, id,email);
            return response.status(200).json({ message: "referral added successfully." });
          }
      }
    }
    return response.status(403).json({ error: "Invalid referralCode" });
  } catch (err) {
    console.log(err);
    return response.status(400).json({ error: INTERNAL_SERVER_ERROR });
  }
};

export const getEarnings = async (request, response) => {
  try {
    const authCode = request.user.accessToken;
    const { id } = jwt.decode(authCode);
    const { referrals } = await getReferralsfromUserId(id);
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
        orderValues.reduce((totalValue, value) => (totalValue += value), 0) * (7 / 100)
      );
      return response.status(200).json({ earnings: earnings });
    } else {
      return response.status(200).json({ message: "No referrals found" });
    }
  } catch (err) {
    console.log(err);
    return response.status(400).json({ error: INTERNAL_SERVER_ERROR });
  }
};

export const getReferrals = async (request, response) => {
  try {
    const authCode =request.user.refreshToken;
    const { id } = jwt.decode(authCode);
    const res = await User.findOne({
      _id: mongoose.Types.ObjectId(id),
    });
    return response.status(200).json({ referrals: res.referrals });
  } catch (error) {
    console.log(error);
    return response.status(400).json({ error: INTERNAL_SERVER_ERROR });
  }
};

export const addOrder = async (request, response) => {
  try {
    const products = request.body.products;
    if (products) {
      const authCode = request.user.refreshToken;
      const { id } = jwt.decode(authCode);
      const orderedProducts = products.map((val) => {
        return { ...val, status: "", productId: mongoose.Types.ObjectId(val.productId) };
      });
      const result = await User.findOneAndUpdate(
        {
          _id: mongoose.Types.ObjectId(id),
        },
        {
          $push: {
            orders: {
              //add orderDate and deliveryDate fields and trackingId--DONE
              orderId: new mongoose.Types.ObjectId(),
              orderDate: new Date(),
              deliveryDate: "",
              trackingId: new mongoose.Types.ObjectId(),
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
    return response.status(400).json({ error: INTERNAL_SERVER_ERROR });
  }
};

export const logout = async (request, response) => {
  try {
    const refreshToken = request.cookies._rt;
    const accessToken = request.cookies._at;
    if (refreshToken && accessToken) {
      let expirySuccessful = false;
      const { id } = jwt.decode(accessToken);
      const session = await findCurrentToken(id, refreshToken);
      await expireToken(id, session.sessions[0].refreshToken, accessToken).then(() => {
        expirySuccessful = true;
        console.log(expirySuccessful);
      });
      if (expirySuccessful) {
        response.clearCookie("_at");
        response.clearCookie("_rt");
        return response.status(200).json({ message: "Succesfully logged out!" });
      } else {
        return response.status(400).json({ error: INTERNAL_SERVER_ERROR });
      }
    } else {
      return response.status(401).json({ error: "You are not authenticated!" });
    }
  } catch (err) {
    console.log(err);
    return response.status(400).json({ error: INTERNAL_SERVER_ERROR });
  }
};

export const clearBlackList = async () => {
  let expiredTokens = await BlackList.find({}, { expiredTokens: 1, _id: 0 });
  if (expiredTokens && expiredTokens.length > 0) {
    expiredTokens
      .map((expiredToken) => expiredToken.expiredTokens)
      .flat(1)
      .forEach(async (val) => {
        if (val !== null) {
          const { id, exp } = jwt.decode(val);
          if (Date.now() > new Date(exp * 1000)) {
            const { acknowledged } = await BlackList.updateOne(
              { user_id: mongoose.Types.ObjectId(id) },
              { $pull: { expiredTokens: val } },
              { safe: true }
            );
            if (acknowledged) {
              console.log(`deleted token`);
            }
          } else {
            console.log("no expiredTokens found");
          }
        }
      });
  } else {
    console.log("no expiredTokens remaining to be cleared");
  }
};
