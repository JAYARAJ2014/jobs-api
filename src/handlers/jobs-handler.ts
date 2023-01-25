import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../custom-errors/not-found-error';
import { IJob, Job } from '../models/job';
import { BadRequestError } from '../custom-errors/bad-request-error';

class JobsHandler {
  public async getAllJobs(req: Request, res: Response) {
    const jobs = await Job.find({ createdBy: req.user?.userId }).sort(
      'createdAt'
    );
    return res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
  }

  public async getJob(req: Request, res: Response) {
    const userId = req.user?.userId;
    const jobId = req.params.id;

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
    const { companyName, position } = req.body;
    const jobId = req.params.id;
    const userId = req.user?.userId;

    if (!companyName || !position) {
      throw new BadRequestError('Company / Postion cannot be empty');
    }
    const job = await Job.findOneAndUpdate(
      { _id: jobId, createdBy: userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!job) {
      throw new NotFoundError(`Job Id: ${jobId} does not exist`);
    }

    return res.status(StatusCodes.OK).json(job);
  }
  public async deleteJob(req: Request, res: Response) {
    const jobId = req.params.id;
    const userId = req.user?.userId;
    const job = await Job.findByIdAndRemove({ _id: jobId, createdBy: userId });
    if (!job) {
      throw new NotFoundError('The specified Job could not be found');
    }
    return res.status(StatusCodes.NO_CONTENT).send();
  }
}

export const jobsHandler = new JobsHandler();
