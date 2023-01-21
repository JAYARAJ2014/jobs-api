import { connect } from 'mongoose';

export const connectDatabase = (url: string) => {
  return connect(url);
};
