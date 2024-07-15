import { Request, Response, NextFunction } from 'express';
import { verifyToken, extractTokenFromRequest } from '../utils/token.utils';

export interface CustomRequest extends Request {
  user?: string | (() => string);
}

export const isLoggedIn = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = extractTokenFromRequest(req);
  const decodedUser = verifyToken(token);
  req.user = decodedUser.sub;
  next();
}
