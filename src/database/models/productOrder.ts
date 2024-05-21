/* eslint-disable require-jsdoc */
import { Model, DataTypes, Sequelize } from 'sequelize';

import { Product } from './product';
import { Order } from './order';

export interface ProductOrderAttributes {
  id: string;
  product_id: string;
  order_id: string;
  quantity: number;
}

export interface ProductOrderCreationAttributes
  extends Omit<ProductOrderAttributes, 'id'> {
  id?: string;
}

export class ProductOrder
  extends Model<ProductOrderAttributes, ProductOrderCreationAttributes>
  implements ProductOrderAttributes
{
  public id!: string;

  public product_id!: string;

  public order_id!: string;

  public quantity!: number;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public readonly deletedAt!: Date;

  /**
   * @static
   * @memberof ProductOrder
   * @returns {void}
   * @description Associate the ProductOrder model with other models.
   * @param {models} models - The models object containing all initialized models.
   */
  static associate(models: {
    Product: typeof Product;
    Order: typeof Order;
  }): void {
    ProductOrder.belongsTo(models.Product, {
      foreignKey: 'product_id',
      as: 'product',
    });
    ProductOrder.belongsTo(models.Order, {
      foreignKey: 'order_id',
      as: 'order',
    });
  }
}

export default (sequelize: Sequelize) => {
  ProductOrder.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      product_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      order_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'product_orders',
      modelName: 'ProductOrder',
      paranoid: true,
      timestamps: true,
    }
  );
  return ProductOrder;
};
