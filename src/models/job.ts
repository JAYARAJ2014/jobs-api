import mongoose, { ObjectId, Schema, model } from 'mongoose';

export enum JobStatusEnum {
  Pending = 'PENDING',
  Interview = 'INTERVIEW',
  Declined = 'DECLINED'
}

export interface IJob {
  companyName: string;
  position: string;
  status: JobStatusEnum;
  createdBy: ObjectId;
}

const JobSchema = new Schema<IJob>(
  {
    companyName: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
      maxlength: [50, 'Cannot exceed 20 characters'],
      minlength: [3, 'Should be at least 3 characters']
    },
    position: {
      type: String,
      required: [true, 'Please provide a name for the position'],
      trim: true,
      maxlength: [255, 'Cannot exceed 255 characters'],
      minlength: [6, 'Should be at least 6 characters']
    },
    status: {
      type: String,
      enum: JobStatusEnum,
      default: JobStatusEnum.Pending
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'User id required']
    }
  },
  { timestamps: true }
);

export const Job = model<IJob>('Job', JobSchema);
