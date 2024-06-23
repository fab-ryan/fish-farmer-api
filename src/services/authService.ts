/* eslint-disable require-jsdoc */
import bcrypt from 'bcryptjs';
import { generateToken, sendEmail } from '../utils';

import Database, { User } from '../database';

/**
 * AuthService class
 */
export class AuthService {
  static async login(
    username: string,
    password: string
  ): Promise<string | null> {
    const user = await Database.User.findOne({
      where: {
        ...this.userNameWhere(username),
      },
    });

    if (!user) {
      return null;
    }
    const isPasswordValid = bcrypt.compareSync(
      password.toString(),
      user.password
    );
    if (!isPasswordValid) {
      return null;
    }
    const token = generateToken({ id: user.id });
    return token;
  }

  static userNameWhere(username: string): Record<string, string> {
    if (username.includes('@')) {
      return { email: username };
    }

    return { phone: this.formatPhoneNumber(username) };
  }

  static formatPhoneNumber(phone: string): string {
    if (phone.startsWith('0')) {
      return phone;
    }
    if (phone.startsWith('+')) {
      return `0${phone.slice(4)}`;
    }

    return `0${phone.slice(3)}`;
  }

  static async forgetPassword(username: string): Promise<string | null> {
    const user = await Database.User.findOne({
      where: { ...this.userNameWhere(username) },
    });
    if (!user) {
      return null;
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const token = generateToken({
      otp,
      id: user.id,
    });

    const mailOptions = {
      to: user.email,
      subject: 'Password Reset',
      template: 'forgotPassword',
      context: {
        otp,
      },
    };
    await sendEmail(mailOptions);

    return token;
  }

  static async profile(id: string): Promise<User | null> {
    const user = await Database.User.findOne({
      where: { id },
      include: [
        { model: Database.Role, as: 'role' },
        { model: Database.Profile, as: 'profile' },
      ],
    });
    if (!user) {
      return null;
    }
    return user;
  }
}
