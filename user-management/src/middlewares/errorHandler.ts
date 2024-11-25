import { NextFunction, Request, Response } from "express";
import { HttpError, responseUnSuccess } from "../utils/index.js";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof HttpError && err.statusCode !== 500) {
    return responseUnSuccess(res, { message: err.message }, err.statusCode);
  }
  
  console.error(err);

  const response: { message: string; error?: string; } = {
    message: err.message || "Internal server error.",
  };

  if (process.env.NODE_ENV !== "production") {
    response.error = err.stack?.toString();
  }

  return responseUnSuccess(res, response, 500);

};
