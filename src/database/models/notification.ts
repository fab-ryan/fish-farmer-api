import { Model, DataTypes, Sequelize } from 'sequelize';
import { User } from './user';

export interface NotificationAttributes {
  id: string;
  user_id: string;
  title: string;
  message: string;
  is_read: boolean;
  type: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface NotificationCreationAttributes
  extends Omit<NotificationAttributes, 'id' | 'updatedAt'> {
  id?: string;
}

/**
 * class for notificcatiion
 *
 */
export class Notification
  extends Model<NotificationAttributes, NotificationCreationAttributes>
  implements NotificationAttributes
{
  public id!: string;

  public user_id!: string;

  public title!: string;

  public message!: string;

  public is_read!: boolean;

  public type!: string;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public readonly deletedAt!: Date;

  // eslint-disable-next-line valid-jsdoc
  /**
   * init function for notification
   * @param {Object} models - The models object.
   * @param {typeof User} models.User - The User model.
   * @returns {Model} Notification
   * @memberof Notification
   * @static
   */
  static associate(models: { User: typeof User }) {
    Notification.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
  }

  /**
   * return to JSON
   * @returns {Object} - The JSON object.
   */
  toJSON() {
    return {
      id: this.id,
      user_id: this.user_id,
      title: this.title,
      message: this.message,
      is_read: this.is_read,
      type: this.type,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
}

export default (sequelize: Sequelize) => {
  Notification.init(
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
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      is_read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'notifications',
      timestamps: true,
      paranoid: true,
    }
  );

  return Notification;
};
