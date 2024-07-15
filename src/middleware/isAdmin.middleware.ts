import { CustomRequest } from "./isLoggedIn.middleware";
import { Response, NextFunction } from "express";
import { CustomError } from "../utils/customError.utils";
import { jwtDecode } from "jwt-decode";
import { asyncHandler } from "./asyncHandler.middleware";
import { extractTokenFromRequest } from "../utils/token.utils";

type payload = {
  sub: string,
  isAdmin: boolean
}

export const isAdmin = asyncHandler(async (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = extractTokenFromRequest(req);
  let decodedToken: payload;

  try {
    decodedToken = jwtDecode(token);
  } catch (error: any) {
    throw new CustomError(403, "Invalid token provided");
  }

  if (!decodedToken.isAdmin) {
    throw new CustomError(403, "Resource restricted to admins");
  }

  next();
});
