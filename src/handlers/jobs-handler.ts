import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../custom-errors/bad-request-error';
import { IJob, Job } from '../models/job';

class JobsHandler {
  public async getAllJobs(req: Request, res: Response) {
    const jobs = await Job.find({createdBy: req.user?.userId}).sort('createdAt');
    return res.status(StatusCodes.OK).json({jobs, count: jobs.length});
  }

  public async getJob(req: Request, res: Response) {
    const {_id} = req.params;
    const job = await Job.findOne({_id:_id})
    return res.status(StatusCodes.OK).json(job);
  }

  public async createJob(req: Request, res: Response) {
    const job = await Job.create({ ...req.body as IJob , createdBy: req.user?.userId});
    return res.status(StatusCodes.CREATED).json(job)
  }
  public async updateJob(req: Request, res: Response) {
    return res.send('Update  job');
  }
  public async deleteJob(req: Request, res: Response) {
    return res.send('Delete job');
  }
}

export const jobsHandler = new JobsHandler();
