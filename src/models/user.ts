import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser {
  username: string;
  email: string;
  password: string;
}

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
    maxlength: [50, 'Cannot exceed 20 characters'],
    minlength: [3, 'Should be at least 3 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    trim: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email'
    ],
    unique: true,
    maxlength: [255, 'Cannot exceed 255 characters'],
    minlength: [6, 'Should be at least 6 characters']
  },
  password: {
    type: String,
    required: [true, 'Password must be provided']
  }
});
UserSchema.pre('save', async function name() {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
export const User = model<IUser>('User', UserSchema);
