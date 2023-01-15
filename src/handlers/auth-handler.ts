import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../models/user';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../custom-errors/bad-request-error';

class AuthHandler {
  public async userInfo(req: Request, res: Response) {
    return res.status(StatusCodes.OK).json(`Hello ${req.currentUser}`);
  }
  public async auth(req: Request, res: Response) {
    console.log(req.headers);
    const luckyNumber = Math.floor(Math.random() * 100);

    const { username, password } = req.body;

    if (!username || !password) {
      throw new BadRequestError('Invalid user name or password ');
    }
    console.log(`Secret... ${process.env.JWT_SECRET}`);
    const secret: string = process.env.JWT_SECRET as string;
    const token = jwt.sign({ username }, secret, { expiresIn: '1d' });
    console.log(`Token : ${token}`);
    return res
      .status(StatusCodes.OK)
      .json({ msg: 'Success', luckyNumber: luckyNumber, token: token });
  }
}

export const authHandler = new AuthHandler();
