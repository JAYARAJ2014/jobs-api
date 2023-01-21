import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../custom-errors/bad-request-error';

class JobsHandler {
  public async getAllJobs(req: Request, res: Response) {
    return res.status(200).json('All jobs');
  }

  public async getJob(req: Request, res: Response) {
    return res.send('A job');
  }

  public async createJob(req: Request, res: Response) {
    return res.send('Created Job');
  }
  public async updateJob(req: Request, res: Response) {
    return res.send('Update  job');
  }
  public async deleteJob(req: Request, res: Response) {
    return res.send('Delete job');
  }
}

export const jobsHandler = new JobsHandler();
