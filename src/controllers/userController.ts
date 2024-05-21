import { Request, Response } from 'express';
import { UserServices } from '../services';
import { sendResponse } from '../utils';

const createUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const emailExists = await UserServices.getUserByEmail(req.body.email);
    if (emailExists) {
      return sendResponse(res, 400, null, 'Email already exists');
    }
    const usernameExists = await UserServices.getUserByUsername(
      req.body.username,
      req.body.first_name,
      req.body.last_name
    );
    if (usernameExists) {
      return sendResponse(res, 400, null, 'Username already exists');
    }
    const user = await UserServices.createUser(req.body);
    if (!user) {
      return sendResponse(res, 400, null, 'User not created');
    }
    return sendResponse(res, 201, user, 'User created successfully');
  } catch (error) {
    const { message } = error as Error;
    return sendResponse(res, 500, null, message);
  }
};

const getUsers = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const users = await UserServices.getAllUsers();
    return sendResponse(res, 200, users, 'Users retrieved successfully');
  } catch (error) {
    const { message } = error as Error;
    return sendResponse(res, 500, null, message);
  }
};

const getUserById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = await UserServices.getUserById(req.params.id);
    if (!user) {
      return sendResponse(res, 404, null, 'User not found');
    }
    return sendResponse(res, 200, user, 'User retrieved successfully');
  } catch (error) {
    const { message } = error as Error;
    return sendResponse(res, 500, null, message);
  }
};

const updateUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = await UserServices.updateUser(req.params.id, req.body);
    if (!user) {
      return sendResponse(res, 404, null, 'User not found');
    }
    return sendResponse(res, 200, user, 'User updated successfully');
  } catch (error) {
    const { message } = error as Error;
    return sendResponse(res, 500, null, message);
  }
};

const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    await UserServices.deleteUser(req.params.id);
    return sendResponse(res, 200, null, 'User deleted successfully');
  } catch (error) {
    const { message } = error as Error;
    return sendResponse(res, 500, null, message);
  }
};

const getUsersByRole = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const users = await UserServices.getUsersByRole(req.params.role);
    if (!users) {
      return sendResponse(res, 404, null, 'No users found');
    }
    return sendResponse(res, 200, users, 'Users retrieved successfully');
  } catch (error) {
    const { message } = error as Error;
    return sendResponse(res, 500, null, message);
  }
};

const userController = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUsersByRole,
};
export { userController };
