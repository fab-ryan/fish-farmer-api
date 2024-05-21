import { Request, Response } from 'express';
import { AuthService } from '../services';
import { sendResponse } from '../utils';

const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { username, password } = req.body;
    const token = await AuthService.login(username, password);
    if (!token) {
      return sendResponse(res, 401, null, 'Invalid username or password');
    }
    return sendResponse(res, 200, { token }, 'Login successful');
  } catch (error) {
    const { message } = error as Error;
    return sendResponse(res, 500, null, message);
  }
};

const profile = async (req: Request, res: Response): Promise<Response> => {
  try {
    type User = { id: string };

    const { id } = req?.user as User;
    const profile = await AuthService.profile(id);
    return sendResponse(res, 200, profile, 'User profile', 'profile');
  } catch (error) {
    const { message } = error as Error;
    return sendResponse(res, 500, null, message);
  }
};

const authController = {
  login,
  profile,
};

export { authController };
