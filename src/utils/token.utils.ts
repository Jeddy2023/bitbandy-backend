import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ObjectId } from "mongoose";
import { Request } from "express";
import { CustomError } from "./customError.utils";
dotenv.config();

export const generateToken = async (userId: ObjectId, isAdmin: boolean) => {
  return jwt.sign({ sub: userId, isAdmin }, process.env.JWT_KEY as string, { expiresIn: "1d" });
}

export const extractTokenFromRequest = (req: Request) => {
  const header = req.headers['authorization'];
  if (!header) {
    throw new CustomError(401, "Token not provided");
  }
  return header.split(" ")[1];
}

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_KEY as string);
  } catch (error: any) {
    throw new CustomError(401, "Invalid or expired token");
  }
}
