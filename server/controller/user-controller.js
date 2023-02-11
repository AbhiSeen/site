import User from "../model/user-schema.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import BlackList from "../model/blacklist-schema.js";
import mongoose from "mongoose";

dotenv.config();

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.EXP_TIME }
  );
};

const findCurrentToken = async (id) => {
  try {
    const { authToken } = await User.findOne(
      {
        _id: mongoose.Types.ObjectId(id),
      },
      { _id: 0, authToken: 1 }
    ).lean();
    return authToken;
  } catch (error) {
    console.log("Error is: ", error);
    return null;
  }
};

const expireToken = async (id, currentToken) => {
  try {
    const createQuery = await BlackList.findOneAndUpdate(
      {
        user_id: mongoose.Types.ObjectId(id),
      },
      {
        $push: { expiredTokens: currentToken },
      },
      { upsert: true }
    );
    return true;
  } catch (error) {
    console.log("Error is: ", error);
    return false;
  }
};

const modifyUserInfo = async (id, token) => {
  try {
    await User.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(id),
      },
      {
        $set: {
          authToken: token,
        },
      },
      {
        new: true,
      }
    );
    return true;
  } catch (error) {
    console.log("Error is:", error);
    return false;
  }
};

const deleteToken = async (id) => {
  try {
    await User.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(id),
      },
      {
        $set: {
          authToken: "",
        },
      }
    );
    return true;
  } catch (error) {
    console.log("Error is:", error);
    return false;
  }
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


export const userSignUp = async (request, response) => {
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
    return response.status(500).json({ message: "some error occured" });
  }
};

export const userLogin = async (request, response) => {
  try {
    const user = await User.findOne({
      email: request.body.email,
    });
    // console.log(user)
    if (user) {
      const decryptedPassword = await bcrypt.compare(
        request.body.password,
        user.password
      );
      const currentToken = await findCurrentToken(user._id);
      if (currentToken) await expireToken(user._id, currentToken);
      const token = generateAccessToken(user);
      await modifyUserInfo(user._id, token);
      delete user._doc.password;
      if (user.username !== "admin" && decryptedPassword) {
        return response.status(200).json({ ...user._doc, authToken: token });
      } else if (user.username === "admin") {
        return response.status(200).json({ message: "ok", authToken: token });
      } else {
        return response
          .status(200)
          .json({ message: "No valid user found" });
      }
    } else {
      return response.status(401).json({ message: "Invalid username/password" });
    }
  } catch (error) {
    console.log("Error is: ", error);
    return response.status(500).json({ error: "some error occured" });
  }
};

export const verifyToken = async (request, response, next) => {
  const authHeader = request.headers.authorization;
  if (authHeader) {
    try {
      const token = authHeader.split(" ")[1];
      if (token!=="null") {
        const { id,username } = jwt.decode(token);
        const inBlackList = await checkTokenInBlackList(token, id);
        if (inBlackList) {
          return response.status(200).json({
            message: "Token is not valid!",
          });
        } else {
          jwt.verify(token, process.env.JWT_SECRET, (err) => {
            if (err) {
              return response.status(200).json({
                message: "Token is not valid!",
              });
            } else {
              request.user = {id,username,token};
              next();
            }
          });
        }
      }
    } catch (error) {
      console.log("Error is: ", error);
      return response.status(500).json({
        message: "cannot decode token",
      });
    }
  } else
    return response.status(401).json({ message: "You are not authenticated!" });
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
    return response.status(500).json("some error occured.Please try again after some time")
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
    return response.status(500).json({ error: "some error occured" });
  }
};

export const getEarnings = async (request, response) => {
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
      .json({ error: "some error occured.Please try again after some time" });
  }
};

export const addProductsfromUser = async (request, response) => {
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
              //add orderDate and deliveryDate fields and trackingId
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
      .json({ message: "some error occured.Please try again after some time" });
  }
};

export const logout = async (request, response) => {
  try {
    if (request.user.id) {
      let expirySuccessful=false;
      const id=request.user.id;
      const token=request.user.token;
      const currentToken = await findCurrentToken(id);
      const tokenDeleted = await deleteToken(id); 
      if (token === currentToken) {
        expirySuccessful = await expireToken(id, currentToken);
      } else {
        expirySuccessful = await expireToken(id, token);
      }
      if (expirySuccessful && tokenDeleted)
          return response.status(200).json({ message: "Succesfully logged out!" });
    } else {
      return response
        .status(401)
        .json({ message: "You are not authenticated!" });
    }
  } catch (err) {
    console.log(err);
    return response.status(500).json({ message: "Some error occured" });
  }
};
