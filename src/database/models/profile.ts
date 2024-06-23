/* eslint-disable valid-jsdoc */
import { Model, DataTypes, Sequelize } from 'sequelize';
import { User } from './user';

export interface ProfileAttributes {
  id: string;
  user_id: string;
  avatar?: string;
  bio?: string;
  company_name?: string;
  company_website?: string;
  province: string;
  district?: string;
  sector?: string;
  cell?: string;
  village?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface ProfileCreationAttributes
  extends Omit<ProfileAttributes, 'id'> {
  id?: string;
}
/**
 * @class Profile
 * @description The Profile model.
 * @extends Model
 * @type ProfileAttributes
 */
export class Profile
  extends Model<ProfileAttributes, ProfileCreationAttributes>
  implements ProfileAttributes
{
  public id!: string;

  public user_id!: string;

  public avatar!: string;

  public bio!: string;

  public company_name!: string;

  public company_website!: string;

  public province!: string;

  public district!: string;

  public sector!: string;

  public cell!: string;

  public village!: string;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public readonly deletedAt!: Date | null;

  /**
   * @static
   * @memberof User
   * @returns {void}
   * @description Associate the User model with other models.
   * @param {models} models - The models object containing all initialized models.
   */
  static associate(models: { User: typeof User }) {
    Profile.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
  }

  /**
   * @method toJSON
   * @memberof Profile
   * @returns {object} - The JSON representation of the Profile model.
   * @description Convert the Profile model to JSON.
   * @public
   */
  toJSON() {
    return {
      id: this.id,
      user_id: this.user_id,
      avatar: this.avatar,
      bio: this.bio,
      company_name: this.company_name,
      company_website: this.company_website,
      province: this.province,
      district: this.district,
      sector: this.sector,
      cell: this.cell,
      village: this.village,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
}

/**
 * @function initProfileModel
 * @memberof Profile
 * @returns {void}
 * @description Initialize the Profile model.
 * @param {sequelize} sequelize - The Sequelize instance.
 */
const initProfileModel = (sequelize: Sequelize) => {
  Profile.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      company_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      company_website: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      province: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      district: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      sector: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      cell: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      village: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Profile',
      paranoid: true,
      tableName: 'profiles',
      timestamps: true,
    }
  );
  return Profile;
};

export default initProfileModel;
