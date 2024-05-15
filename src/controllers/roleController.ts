import { Request, Response } from 'express';
import { RoleServices } from '../services';
import { sendResponse } from '../utils';

const createRole = async (req: Request, res: Response): Promise<Response> => {
  try {
    const role = await RoleServices.createRole(req.body);
    if (!role) {
      return sendResponse(res, 400, null, 'Role not created');
    }
    return sendResponse(res, 201, role, 'Role created successfully');
  } catch (error) {
    const { message } = error as Error;
    return sendResponse(res, 500, null, message);
  }
};

const getRoles = async (req: Request, res: Response): Promise<Response> => {
  try {
    const roles = await RoleServices.getRoles();
    return sendResponse(res, 200, roles);
  } catch (error) {
    const { message } = error as Error;
    return sendResponse(res, 500, null, message);
  }
};

const getRoleById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const role = await RoleServices.getRoleById(id);
    if (!role) {
      return sendResponse(res, 404, null, 'Role not found');
    }
    return sendResponse(res, 200, role);
  } catch (error) {
    const { message } = error as Error;
    return sendResponse(res, 500, null, message);
  }
};

const updateRole = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const role = await RoleServices.updateRole(id, req.body);
    if (!role) {
      return sendResponse(res, 404, null, 'Role not found');
    }
    return sendResponse(res, 200, role, 'Role updated successfully');
  } catch (error) {
    const { message } = error as Error;
    return sendResponse(res, 500, null, message);
  }
};

const deleteRole = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const deletedRole = await RoleServices.deleteRole(id);
    if (!deletedRole) {
      return sendResponse(res, 404, null, 'Role not found');
    }
    return sendResponse(res, 200, null, 'Role deleted successfully');
  } catch (error) {
    const { message } = error as Error;
    return sendResponse(res, 500, null, message);
  }
};

export const roleController = {
  createRole,
  getRoles,
  getRoleById,
  updateRole,
  deleteRole,
};
