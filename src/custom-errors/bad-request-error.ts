import { StatusCodes } from 'http-status-codes';
import { CustomApiError } from './custom-api-error';

export class BadRequestError extends CustomApiError {
  statusCode: number;
  constructor(public messsage: string) {
    super(messsage);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
