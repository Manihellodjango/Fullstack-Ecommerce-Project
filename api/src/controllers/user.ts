import express, {Request, Response} from 'express';
import bcrypt from "bcrypt";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { dev } from "../config/index";
import { sendEmailWithNodeMailer } from "../helpers/email";

export const registerUser = async (req:Request, res:Response) => {
  try {
    const { name, email, password, address } = req.body;
    const exsitingUser = await User.findOne({ email });
    if (exsitingUser) {
      return res
        .status(400)
        .json({ error: "user already exit with this email" });
    }
    // hash the password
    const salt = await bcrypt.genSalt(12);
    console.log(salt);
    const hashPassword = await bcrypt.hash(password, salt);

    // store the user data temporarily inside a token
    const token = jwt.sign(
      { name, email, hashPassword, address },
      dev.app.jwtSecretKey,
      {
        expiresIn: "50m",
      }
    );
    // prepare email
    const emailData = {
      email,
      subject: "Account Activation email",
      html: `<h2> Hello ${name}. </h2>
        <p> Please click here to <a href= "${dev.app.clientUrl}/auth/activate/${token}">activate your account </a> </p>`,
    };

    sendEmailWithNodeMailer(emailData);
    return res.status(200).json({
      message: `Please go to your email: ${email} for activating your account`,
    });
  } catch (error:any) {
    return res.json({
      error: error.message,
    });
  }
};

// Activation of account

export const activateAccount = async (req:Request, res:Response) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(404).json({ error: "token not found" });
    }

    jwt.verify(token, dev.app.jwtSecretKey, async (err:any, decoded:any) => {
      if (err) {
        return res
          .status(401)
          .json({ error: "link has expired. please sign again" });
      }
      const { name, email, hashPassword, address } = decoded;
      const newUser = new User({
        name,
        email,
        password: hashPassword,
        address,
      });
      await newUser.save();
    });
    return res.status(200).json({
      message: `Account was activated`,
    });
  } catch (error:any) {
    return res.json({
      error: error.message,
    });
  }
};

// login user

export const loginUser = async (req:Request, res:Response) => {
  try {
    const { email, password } = req.body;
    const exsitingUser = await User.findOne({ email });
    if (!exsitingUser) {
      return res
        .status(400)
        .json({
          error: "user doesnot exist with this email. please register first",
        });
    }
    const isPasswordMatched = await bcrypt.compare(
      password,
      exsitingUser.password
    );
    if (!isPasswordMatched) {
      return res.status(400).json({ error: "Email/password did not match" });
    }

    // store the user data temporarily inside a token
    const token = jwt.sign({ _id: exsitingUser._id }, dev.app.jwtSecretKey, {
      expiresIn: "30m",
    });
    return res.status(200).json({
      message: `User was signed in `,
      user: {
        name: exsitingUser.name,
        email: exsitingUser.email,
        address: exsitingUser.address,
        isAdmin: exsitingUser.isAdmin
      },
      token,
    });
  } catch (error:any) {
    return res.json({
      error: error.message,
    });
  }
};

// protected user route 

export const loadProtected = async (req:Request, res:Response) => {
  try {
    return res.status(200).json({
      message: `Protected page `,
    });
  } catch (error:any) {
    return res.json({
      error: error.message,
    });
  }
};
