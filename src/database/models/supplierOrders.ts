/* eslint-disable valid-jsdoc */
import { Model, DataTypes, Sequelize } from 'sequelize';
import { User } from './user';
import { Order } from './order';

export interface SupplierOrderAttributes {
  id: string;
  supplier_id: string;
  order_id: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface SupplierOrderCreationAttributes
  extends Omit<
    SupplierOrderAttributes,
    'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
  > {}
/**
 * A class which represents the supplierOrders table in the database.
 * @class SupplierOrders
 * @extends Model<SupplierOrderAttributes, SupplierOrderCreationAttributes>
 * @type {SupplierOrders}
 * @example const supplierOrders = new SupplierOrders(
 */
export class SupplierOrders
  extends Model<SupplierOrderAttributes, SupplierOrderCreationAttributes>
  implements SupplierOrderAttributes
{
  public id!: string;

  public supplier_id!: string;

  public order_id!: string;

  public status!: string;

  public createdAt!: Date;

  public updatedAt!: Date;

  public deletedAt!: Date | null;

  public readonly supplier?: User;

  public readonly order?: Order;

  /**
   * Initializes the supplierOrders model.
   * @param sequelize The sequelize object.
   * @description Initializes the supplierOrders model and defines the schema.
   */
  static associate(models: { User: typeof User; Order: typeof Order }) {
    SupplierOrders.belongsTo(models.User, {
      foreignKey: 'supplier_id',
      as: 'supplier',
    });
    SupplierOrders.belongsTo(models.Order, {
      foreignKey: 'order_id',
      as: 'order',
    });
  }

  /**
   * returns the JSON representation of the supplierOrders model.
   */
  toJSON() {
    return {
      id: this.id,
      supplier_id: this.supplier_id,
      order_id: this.order_id,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
      supplier: this.supplier,
      order: this.order,
    };
  }
}

/**
 * Initializes the supplierOrders model.
 * @param sequelize The sequelize object.
 * @returns The supplierOrders model.
 * @description Initializes the supplierOrders model and defines the schema.
 */
const supplierOrdersModel = (sequelize: Sequelize) => {
  SupplierOrders.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      supplier_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      order_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending',
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
      modelName: 'SupplierOrders',
      timestamps: true,
      tableName: 'supplier_orders',
      paranoid: true,
    }
  );
  return SupplierOrders;
};

export default supplierOrdersModel;
