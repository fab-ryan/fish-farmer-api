import { Request, Response } from 'express';
import { ProfileService } from '../services';
import { sendResponse, fileUpload, handleDelete } from '../utils';

const createProfile = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.user as { id: string };
    if (req.files) {
      const existingProfile = await ProfileService.findProfileByUserId(id);
      if (existingProfile && existingProfile.avatar !== null) {
        await handleDelete(existingProfile.avatar as string);
        req.body.avatar = await fileUpload(
          req.file as Express.Multer.File | undefined,
          'avatars'
        );
      } else {
        req.body.avatar = await fileUpload(
          req.file && (req.file as Express.Multer.File | undefined),
          'avatars'
        );
      }
    }
    const data = req.body;
    const profile = await ProfileService.createProfile({
      ...data,
      user_id: id,
    });
    if (!profile) {
      return sendResponse(res, 500, null, 'Error creating profile');
    }
    return sendResponse(res, 201, profile, 'Profile created', 'profile');
  } catch (error) {
    const { message } = error as Error;
    return sendResponse(res, 500, null, message);
  }
};

const getProfile = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.user as { id: string };
    const profile = await ProfileService.findProfileByUserId(id);
    if (!profile) {
      return sendResponse(res, 404, null, 'Profile not found');
    }
    return sendResponse(res, 200, profile, 'Profile retrieved', 'profile');
  } catch (error) {
    const { message } = error as Error;
    return sendResponse(res, 500, null, message);
  }
};

const updateProfileController = {
  createProfile,
  getProfile,
};
export { updateProfileController };
