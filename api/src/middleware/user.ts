import express, {Request, Response,NextFunction} from 'express';
import jwt from "jsonwebtoken";
import { dev } from "../config/index";
import User from "../models/user";

export interface TokenInterface {
  _id:string
}
export interface CustomRequest extends Request {
  userId:string
}

export const isLoggedIn = (req:Request, res:Response,next:Function) => {
  try {
    if (!req.headers.authorization) {
      return res.json({
        error: "no token found in request headers",
      });
    }
    const token = req.headers.authorization;
    const decode = jwt.verify(token, dev.app.jwtSecretKey);
    (req as CustomRequest).userId = (decode as TokenInterface)._id;
    next();
  } catch (error:any) {
    return res.status(401).json({
      error: error.message,
    });
  }
};

export const isAdmin = async (req:Request, res:Response,next:NextFunction) => {
  try {
    const exsitingUser = await User.findById({ _id: (req as CustomRequest).userId });
    if (!exsitingUser) {
      return res.json({
        error: "no user is found. please login",
      });
    }
    if (exsitingUser.isAdmin !== 1) {
      return res.status(401).json({
        error: "Unauthorized user. you are not adin",
      });
    }
    next();
  } catch (error:any) {
    return res.status(401).json({
      error: error.message,
    });
  }
};
