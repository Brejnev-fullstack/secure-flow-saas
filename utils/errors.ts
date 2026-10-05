export class AppError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
export function createError(message: string, statusCode: number): AppError {
  return new AppError(message, statusCode);
}
export const badRequest = (msg: string) => createError(msg, 400);
export const unauthorized = (msg: string) => createError(msg, 401);
export const forbidden = (msg: string) => createError(msg, 403);
export const notFound = (msg: string) => createError(msg, 404);

