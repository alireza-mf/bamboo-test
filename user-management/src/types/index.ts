
import { RequestHandler as ExpressRequestHandler } from "express";

export * from "./routes/user.js";

export type RequestHandler<TParam = {}, ResBody = {}, TBody = {}, TQuery = {}> =
  ExpressRequestHandler<TParam, ResBody, TBody, TQuery>;

export enum HttpStatus {
  SUCCESS = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  FOUND= 302,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
}
