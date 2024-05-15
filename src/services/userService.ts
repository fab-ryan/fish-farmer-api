/* eslint-disable camelcase */
/* eslint-disable require-jsdoc */
/* eslint-disable class-methods-use-this */
import bcrypt from 'bcryptjs';
import database, { User, UserAttributes } from '../database';

interface UserCreationAttributes
  extends Omit<UserAttributes, 'id' | 'username'> {
  username?: string;
}

/**
 * A class representing the UserService.
 * @class
 */
class UserServices {
  /**
   * @memberof UserService
   * @returns {Promise<UserAttributes[]>} A list of users.
   * @description Get all users.
   */
  static async getAllUsers(): Promise<UserAttributes[]> {
    const users = await database.User.findAll();
    return users;
  }

  /**
   * @memberof UserService
   * @param {string} id - The user id.
   * @returns {Promise<UserAttributes>} A user object.
   * @description Get a user by id.
   */
  static async getUserById(id: string): Promise<User | null> {
    const user = await database.User.findOne({
      where: { id },
    });
    if (!user) {
      return null;
    }
    return user;
  }

  /**
   * @memberof UserService
   * @param {UserAttributes} user - The user object.
   * @returns {Promise<UserAttributes>} A user object.
   * @description Create a new user.
   */
  static async createUser(
    user: UserCreationAttributes
  ): Promise<UserAttributes> {
    const newUser = await database.User.create({
      ...user,
      password: bcrypt.hashSync(user.password, 10),
      username: user.username || UserServices.formatUserName(user),
      phone: UserServices.formatPhone(user.phone),
    });
    return newUser;
  }

  static formatUserName({
    first_name,
    last_name,
  }: {
    first_name: string;
    last_name: string;
  }) {
    const username = `${first_name} ${last_name}`
      .replace(/' '/g, '_')
      .replace(/[^a-zA-Z0-9_]/g, '')
      .replace(/\s/g, '')
      .toLowerCase();
    return username;
  }

  static formatPhone(phone: string) {
    if (phone.startsWith('0')) {
      return phone;
    }
    if (phone.startsWith('+')) {
      return `0${phone.slice(4)}`;
    }

    return `0${phone.slice(3)}`;
  }

  /**
   * @memberof UserService
   * @param {string} id - The user id.
   * @param {UserAttributes} user - The user object.
   * @returns {Promise<UserAttributes>} A user object.
   * @description Update a user.
   */

  static async updateUser(
    id: string,
    user: UserCreationAttributes
  ): Promise<UserAttributes | null> {
    const userToUpdate = await UserServices.getUserById(id);
    if (!userToUpdate) {
      return null;
    }
    await userToUpdate.update(user);
    return userToUpdate;
  }

  /**
   * @memberof UserService
   * @param {string} id - The user id.
   * @returns {Promise<void>} A promise object.
   * @description Delete a user.
   */
  static async deleteUser(id: string): Promise<void> {
    await database.User.destroy({
      where: { id },
    });
  }

  /**
   * @memberof UserService
   * @param {string} username - The username.
   * @returns {Promise<UserAttributes | null>} A user object.
   * @description Get a user by username.
   */
  static async getUserByUsername(username: string): Promise<User | null> {
    const user = await database.User.findOne({
      where: { username },
    });
    if (!user) {
      return null;
    }
    return user;
  }

  static async getUserByEmail(email: string): Promise<User | null> {
    const user = await database.User.findOne({
      where: { email },
    });
    if (!user) {
      return null;
    }
    return user;
  }
}

export { UserServices };
