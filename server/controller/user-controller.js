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
      username: user.username,
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
      },{
        new:true
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

export const userSignUp = async (request, response) => {
  try {
    const existingUser = await User.findOne({
      username: request.body.username,
    });
    if (existingUser) {
      return response.status(200).json({ message: "User already exists" });
    }
    const newUser = request.body;
    const password = await bcrypt.hash(request.body.password, 10);
    const encryptedUser = { ...newUser, password };
    const User = new User(encryptedUser);
    await User.save();
    return response.status(200).json({ message: "successfully signed up" });
  } catch (error) {
    console.log("Error is: ", error);
    return response.status(500).json({ message: "some error occured" });
  }
};

export const userLogin = async (request, response) => {
  try {
    const user = await User.findOne({
      username: request.body.username,
    });
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
        return response.status(200).json({ ...user._doc,authToken:token });
      } else if (user.username === "admin") {
        return response.status(200).json({ message: "ok", authToken: token });
      } else {
        return response.status(401).json("Invalid Login");
      }
    
  } catch (error) {
    console.log("Error is: ", error);
    return response.status(500).json({ error: "some error occured" });
  }
};

export const verifyToken = async (request, response) => {
  const authHeader = request.headers.authorization;
  if (authHeader) {
    try {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
        if (err) {
          return response.status(401).json({
            message: "You are not authenticated!",
          });
        } else {
          return response.status(200).json({
            message: "ok",
          });
        }
      });
    } catch (error) {
      console.log("Error is: ", error);
      return response.status(500).json({
        message: "cannot decode token",
      });
    }
  } else
    return response.status(401).json({ message: "You are not authenticated!" });
};

export const logout = async (request, response) => {
  try {
    const authHeader = request.headers.authorization;
    const token = authHeader.split(" ")[1];
    if (authHeader && token != null) {
      const { id } = jwt.decode(token);
      const currentToken = await findCurrentToken(id);
      const tokenDeleted = await deleteToken(id);
      if (token === currentToken) {
        const expirySuccessful = await expireToken(id, currentToken);
        if (expirySuccessful && tokenDeleted)
          return response
            .status(200)
            .json({ message: "Succesfully logged out!" });
      } else {
        const expirySuccessful = await expireToken(id, token);
        if (expirySuccessful && tokenDeleted) {
          return response
            .status(200)
            .json({ message: "Succesfully logged out!" });
        }
      }
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
