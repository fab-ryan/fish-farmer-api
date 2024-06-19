/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
import Database, { Product, ProductCreationAttributes } from '../database';
/**
 * ProductService class
 * @class
 * @classdesc ProductService class
 * @exports ProductService
 * @public
 * @version 1.0.0
 * @since 1.0.0
 * @static
 * @memberof module:services
 * @requires Database
 * @requires Product
 * @see {@link module:database}
 * @see {@link module:database/models/product}
 */
export class ProductService {
  /**
   * Create a new product.
   * @param data - The data for the new product.
   * @returns The created product or null if an error occurred.
   */
  static async createProduct(
    data: ProductCreationAttributes
  ): Promise<Product | null> {
    try {
      const product = await Database.Product.create({
        ...data,
        slug: await ProductService.generateSlug(data.name),
      });
      return product;
    } catch (error) {
      return null;
    }
  }

  static async getProducts(): Promise<Product[] | null> {
    const products = await Database.Product.findAll({
      order: [['createdAt', 'DESC']],
      where: {
        status: 'active',
      },
    });
    return products;
  }

  static async getProductBySlug(slug: string): Promise<Product | null> {
    const product = await Database.Product.findOne({
      where: {
        slug,
      },
    });
    if (!product) {
      return null;
    }
    return product;
  }

  static async updateProduct(
    id: string,
    data: Partial<ProductCreationAttributes>
  ): Promise<Product | null> {
    try {
      const product = await Database.Product.findOne({ where: { id } });
      if (!product) {
        return null;
      }
      await product.update(data);
      return product;
    } catch (error) {
      return null;
    }
  }

  static async deleteProduct(id: string): Promise<boolean> {
    try {
      const product = await Database.Product.findByPk(id);
      if (!product) {
        return false;
      }
      await product.destroy();
      return true;
    } catch (error) {
      return false;
    }
  }

  static async isProductExist(name: string): Promise<boolean> {
    try {
      const product = await Database.Product.findOne({
        where: {
          name: name.toLowerCase().trim(),
        },
      });
      return !!product;
    } catch (error) {
      return false;
    }
  }

  static async generateSlug(name: string): Promise<string> {
    try {
      const slug = name
        .toLowerCase()
        .trim()
        .replace(/[^a-zA-Z0-9]/g, '-')
        .replace(/-+/g, '-');
      const slugExists = await Database.Product.findOne({
        where: {
          slug,
        },
      });
      if (slugExists) {
        return `${slug}-${Date.now()}`;
      }
      return slug;
    } catch (error) {
      return '';
    }
  }
}
