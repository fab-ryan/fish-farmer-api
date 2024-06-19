/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable require-jsdoc */
import { Model, DataTypes, Sequelize } from 'sequelize';
import { Order } from './order';

export interface ProductAttributes {
  id: string;
  name: string;
  description: string;
  images: string[];
  thumbnail: string;
  price: number;
  quantity: number;
  unit: string;
  status: string;
  slug: string;
}
export interface ProductCreationAttributes
  extends Omit<ProductAttributes, 'id' | 'slug'> {
  id?: string;
  slug?: string;
}

export class Product
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes
{
  public id!: string;

  public slug!: string;

  public name!: string;

  public description!: string;

  public images!: string[];

  public thumbnail!: string;

  public price!: number;

  public quantity!: number;

  public unit!: string;

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
  static associate(models: { Order: typeof Order }) {}

  toJSON() {
    return {
      id: this.id,
      slug: this.slug,
      name: this.name,
      description: this.description,
      images: this.images,
      thumbnail: this.thumbnail,
      price: this.price,
      quantity: this.quantity,
      unit: this.unit,
      status: this.status,
      createdAt: this.createdAt,
      updateAt: this.updatedAt,
    };
  }
}

export default (sequelize: Sequelize) => {
  Product.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      images: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      thumbnail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      unit: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'active',
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'products',
      modelName: 'Product',
      timestamps: true,
      paranoid: true,
    }
  );

  return Product;
};
