import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UnAuthorizedError } from '../custom-errors/unauthorized-error';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(`Auth Middleware invoked`);
  const { authorization } = req.headers;
  console.log(authorization);
  if (!authorization || !authorization.startsWith('Bearer ')) {
    req.currentUser = '';
    throw new UnAuthorizedError('Invalid Token. Access Denied');
  }
  const token = authorization.substring(7);
  try {
    const secret = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token, secret) as JwtPayload;
    const username: string = decoded?.username;
    req.currentUser = username;

    console.log(req.currentUser);
    next();
  } catch (error) {
    req.currentUser = '';
    console.log(`Error in verifying JWT `, error);
    throw new UnAuthorizedError('Invalid Token. Access Denied');
  }
};
