import Database, {
  ProfileAttributes,
  ProfileCreationAttributes,
} from '../database';

/**
 * @class ProfileService
 * @description The Profile service.
 */
export class ProfileService {
  /**
   * @static
   * @returns {Promise<ProfileAttributes | null>} The profile.
   * @description Find a profile by id.
   * @memberof ProfileService
   * @throws {Error}
   */
  /**
   * @static
   * @param {ProfileCreationAttributes} profile - The profile to create.
   * @returns {Promise<ProfileAttributes>} The created profile.
   * @memberof ProfileService
   * @throws {Error}
   */
  static async createProfile(
    profile: ProfileCreationAttributes
  ): Promise<ProfileAttributes> {
    const existingProfile = await Database.Profile.findOne({
      where: { user_id: profile.user_id },
    });
    if (existingProfile) {
      return existingProfile.update(profile);
    }
    return Database.Profile.create(profile);
  }

  /**
   * @static
   * @param {string} id - The id of the profile to find.
   * @returns {Promise<ProfileAttributes | null>} The profile.
   * @memberof ProfileService
   * @throws {Error}
   */
  static async findProfileById(id: string): Promise<ProfileAttributes | null> {
    return Database.Profile.findOne({
      where: { id },
    });
  }

  /**
   * @static
   * @param {string} userId - The user id.
   * @returns {Promise<ProfileAttributes | null>} The profile.
   * @memberof ProfileService
   * @throws {Error}
   */
  static async findProfileByUserId(
    userId: string
  ): Promise<ProfileAttributes | null> {
    return Database.Profile.findOne({
      where: { user_id: userId },
    });
  }

  /**
   * @static
   * @param {string} id - The id of the profile to update.
   * @param {string} avatar - The avatar to update.
   * @returns {Promise<ProfileAttributes | null>} The updated profile.
   * @memberof ProfileService
   * @throws {Error}
   */
  static async updateProfile(
    id: string,
    avatar: string
  ): Promise<ProfileAttributes | null> {
    const profile = await Database.Profile.findOne({
      where: { id },
    });
    if (!profile) {
      return null;
    }
    profile.avatar = avatar;
    await profile.save();
    return profile;
  }
}
