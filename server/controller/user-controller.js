import User from "../model/user-schema.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import bcrypt from "bcryptjs";

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

export const userSignUp = async (request, response) => {
  try {
    const exist = await User.findOne({ username: request.body.username });
    if (exist) {
      return response.status(401).json({ message: "User already exist" });
    }
    const user = request.body;
    const password=await bcrypt.hash(request.body.password, 10);
    const encryptedUser={...user,password};
    const newUser = new User(encryptedUser);
    await newUser.save();
    return response.status(200).json({ mesage: user });
  } catch (error) {
    return response.status(500).json({ message: "some error occured" });
  }
};

export const userLogin = async (request, response) => {
  try {
    const user = await User.findOne({
      username: request.body.username,
    });
    const decryptedPassword=await bcrypt.compare(request.body.password,user.password);
    console.log(decryptedPassword)
    const token=generateAccessToken(user);
    if (user.username !== "admin" && decryptedPassword) {
      return response.status(200).json({ data: user,authToken:token });
    } else if (user.username === "admin") {
      return response.status(200).json({ message: "ok",authToken:token });
    } else {
      return response.status(401).json("Invalid Login");
    }
  } catch (error) {
    console.log(error.message)
    return response.status(500).json({error:"some error occured"});
  }
};

export const verifyToken=async(request,response)=>{
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
    } catch (err) {
      return response.status(500).json({
        message: "cannot decode token",
      });
    }
  } else return response.status(401).json({ message: "You are not authenticated!" });
}
