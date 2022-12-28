import express, {Request, Response,NextFunction} from 'express';
import { validationResult } from "express-validator";

export const runValidation = (req:Request
  ,res:Response, next:NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let errorsList = errors.array().map((error) => error.msg);
    return res.status(400).json({ errors: errorsList });
  }
  next();
};
