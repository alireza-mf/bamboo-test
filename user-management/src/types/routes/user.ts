import { RequestHandler } from "../index.js";

// *****************************************************

export type IRegisterUserBody = {
  username: string;
  password: string;
};
export type IRegisterUserRes = {};

/**
 * @method POST
 * @route /api/users/register
 */
export type IRegisterUserApi = RequestHandler<{}, IRegisterUserRes, IRegisterUserBody>;

// *****************************************************

export type ILoginUserBody = {
  username: string;
  password: string;
};
export type ILoginUserRes = {
  token: string;
};

/**
 * @method POST
 * @route /api/users/login
 */
export type ILoginUserApi = RequestHandler<{}, ILoginUserRes, ILoginUserBody>;
