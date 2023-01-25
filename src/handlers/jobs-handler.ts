import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../custom-errors/not-found-error';
import { IJob, Job } from '../models/job';
import { BadRequestError } from '../custom-errors/bad-request-error';
import { Mongoose } from 'mongoose';

class JobsHandler {
  public async getAllJobs(req: Request, res: Response) {
    const jobs = await Job.find({ createdBy: req.user?.userId }).sort(
      'createdAt'
    );
    return res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
  }

  public async getJob(req: Request, res: Response) {
    const {
      user: userId,
      params: { id: jobId }
    } = req; // nested destructuring

    const job = await Job.findOne({ _id: jobId, createdBy: userId });
    if (!job) {
      throw new NotFoundError(`Job Id: ${jobId} does not exist`);
    }

    return res.status(StatusCodes.OK).json(job);
  }

  public async createJob(req: Request, res: Response) {
    const job = await Job.create({
      ...(req.body as IJob),
      createdBy: req.user?.userId
    });
    return res.status(StatusCodes.CREATED).json(job);
  }
  public async updateJob(req: Request, res: Response) {
    const {companyName, position} = req.body;
    const jobId = req.params.id; 
    const userId = req.user?.userId;
    
    if(!companyName || !position) {
      throw new BadRequestError('Company / Postion cannot be empty')
    }
    const job = await Job.findOneAndUpdate({ _id: jobId, createdBy: userId },req.body, {new:true, runValidators:true});
    if (!job) {
      throw new NotFoundError(`Job Id: ${jobId} does not exist`);
    }

    return res.status(StatusCodes.OK).json(job);
  }
  public async deleteJob(req: Request, res: Response) {
    return res.send('Delete job');
  }
}

export const jobsHandler = new JobsHandler();
