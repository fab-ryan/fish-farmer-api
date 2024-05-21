import { Model, DataTypes, Sequelize } from 'sequelize';
import { Role } from './role';

export interface UserAttributes {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  role_id?: string;
  status?: string;
}

const defaultRole = 'a0798e07-3ba9-4aa7-b36f-4f472ecb1ccb';
interface UserCreationAttributes extends Omit<UserAttributes, 'id'> {
  id?: string;
}
/**
 * A class representing the User model.
 * @class
 */
export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: string;

  public first_name!: string;

  public last_name!: string;

  public username!: string;

  public email!: string;

  public phone!: string;

  public password!: string;

  public role_id!: string;

  public role?: Role;

  public status!: string;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public readonly deletedAt!: Date;

  /**
   * @static
   * @memberof User
   * @returns {void}
   * @description Associate the User model with other models.
   * @param {models} models - The models object containing all initialized models.
   */
  static associate(models: { Role: typeof Role }) {
    User.belongsTo(models.Role, { foreignKey: 'role_id', as: 'role' });
  }

  /**
   * Associations.
   * @param {models} models - The models object containing all initialized models.
   * @returns {Object} An object representing association.
   */
  toJSON() {
    return {
      id: this.id,
      first_name: this.first_name,
      last_name: this.last_name,
      username: this.username,
      email: this.email,
      phone: this.phone,
      role_id: this.role_id,
      role: this.role,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
}

export default (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role_id: {
        type: DataTypes.UUID,
        allowNull: true,
        defaultValue: defaultRole,
        references: {
          model: 'roles',
          key: 'id',
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active',
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: true,
      paranoid: true,
    }
  );

  return User;
};
