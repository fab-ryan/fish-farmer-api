/* eslint-disable valid-jsdoc */
import { Op } from 'sequelize';
import database, { Role, RoleAttributes } from '../database';

interface RoleCreationAttributes extends Omit<RoleAttributes, 'id'> {}
/**
 * RoleServices class
 */
export class RoleServices {
  /**
   * @param role
   * @returns {Promise<any>}
   * @description create a new role
   */
  static async createRole(role: RoleCreationAttributes): Promise<Role | null> {
    const newRole = await database.Role.create(role);
    if (newRole) {
      return newRole;
    }
    return null;
  }

  /**
   * @returns {Promise<any>}
   * @description get all roles
   */
  static async getRoles(role: Role): Promise<Role[]> {
    if (role.name === 'admin') {
      return database.Role.findAll();
    }
    // all return except admin
    return database.Role.findAll({
      where: {
        [Op.not]: [{ name: 'admin' }, { name: 'operator' }],
      },
    });
  }

  /**
   * @param id
   * @returns {Promise<any>}
   * @description get a role by id
   */
  static async getRoleById(id: string): Promise<Role | null> {
    return database.Role.findOne({ where: { id } });
  }

  /**
   * @param id
   * @param role
   * @returns {Promise<any>}
   * @description update a role
   */
  static async updateRole(
    id: string,
    role: RoleCreationAttributes
  ): Promise<[affectedCount: number] | null> {
    const updatedRole = await database.Role.update(role, { where: { id } });
    if (!updatedRole) return null;
    return updatedRole;
  }

  /**
   * @param id
   * @returns {Promise<any>}
   * @description delete a role
   */
  static async deleteRole(id: string): Promise<number> {
    return database.Role.destroy({ where: { id } });
  }
}
