// This is done to extend the Request interface in express
declare namespace Express {
  export interface Request {
    currentUser?: string;
  }
}
