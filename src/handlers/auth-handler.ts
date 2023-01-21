import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../models/user';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../custom-errors/bad-request-error';
import bcrypt from 'bcryptjs';
class AuthHandler {
  public async register(req: Request, res: Response) {
    const { username, email, password } = req.body;
    if (!username || !password || !email) {
      throw new BadRequestError('Required input is not provided.');
    }
    
    const user = await User.create({ ...req.body });
    console.log(`User Created:  `, user);
    return res.status(StatusCodes.OK).json(user);
  }
  public async login(req: Request, res: Response) {}
  // public async userInfo(req: Request, res: Response) {
  //   return res.status(StatusCodes.OK).json(`Hello ${req.currentUser}`);
  // }
  // public async auth(req: Request, res: Response) {
  //   console.log(req.headers);
  //   const luckyNumber = Math.floor(Math.random() * 100);

  //   const { username, password } = req.body;

  //   if (!username || !password) {
  //     throw new BadRequestError('Invalid user name or password ');
  //   }
  //   console.log(`Secret... ${process.env.JWT_SECRET}`);
  //   const secret: string = process.env.JWT_SECRET as string;
  //   const token = jwt.sign({ username }, secret, { expiresIn: '1d' });
  //   console.log(`Token : ${token}`);
  //   return res
  //     .status(StatusCodes.OK)
  //     .json({ msg: 'Success', luckyNumber: luckyNumber, token: token });
  // }
}

export const authHandler = new AuthHandler();
