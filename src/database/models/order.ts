/* eslint-disable require-jsdoc */
import { Model, DataTypes, Sequelize } from 'sequelize';

import { User } from './user';
import { ProductOrder } from './productOrder';

export interface OrderAttributes {
  id: string;
  order_number: string;
  user_id: string;
  status: string;
}

export interface OrderCreationAttributes extends Omit<OrderAttributes, 'id'> {
  id?: string;
}

export class Order
  extends Model<OrderAttributes, OrderCreationAttributes>
  implements OrderAttributes
{
  public id!: string;

  public order_number!: string;

  public user_id!: string;

  public status!: string;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public readonly deletedAt!: Date;

  /**
   * @static
   * @memberof Order
   * @returns {void}
   * @description Associate the Order model with other models.
   * @param {models} models - The models object containing all initialized models.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static associate(models: {
    User: typeof User;
    ProductOrder: typeof ProductOrder;
  }): void {
    Order.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
    Order.hasMany(models.ProductOrder, {
      foreignKey: 'order_id',
      as: 'product_orders',
    });
  }
}
export default (sequelize: Sequelize) => {
  Order.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      order_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending',
      },
    },
    {
      sequelize,
      modelName: 'Order',
      tableName: 'orders',
      paranoid: true,
      timestamps: true,
    }
  );

  return Order;
};
