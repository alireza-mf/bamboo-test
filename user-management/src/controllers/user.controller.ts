import { registerUser, loginUser } from '../services/user.service.js';
import { responseSuccess } from '../utils/index.js';
import { HttpStatus, ILoginUserApi, IRegisterUserApi } from '../types/index.js';

export const register = <IRegisterUserApi>(async (req, res) => {
  const { username, password } = req.body;
  await registerUser(username, password);

  return responseSuccess(res, {}, HttpStatus.CREATED);
});

export const login = <ILoginUserApi>(async (req, res) => {
  const { username, password } = req.body;
  const { token } = await loginUser(username, password);

  return responseSuccess(res, { token }, HttpStatus.SUCCESS);
});
