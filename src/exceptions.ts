import { HttpStatus, HttpException } from "@nestjs/common";
// import { HttpException } from "@nestjs/common/exceptions/http.exception";
export class AuthFailureException extends HttpException {
  constructor(objectOrError?: string | object | any, description?: string) {
    super(objectOrError, HttpStatus.UNAUTHORIZED);
  }
}
