import Database, {
  SupplierOrders,
  SupplierOrderCreationAttributes,
  SupplierOrderAttributes,
} from '../database';

/**
 * A class which represents the supplierOrders table in the database.
 * @class SupplierOrdersService
 */
export class SupplierOrdersService {
  /**
   * Create a new supplier order.
   * @param {SupplierOrderCreationAttributes} data - The data for the new supplier order.
   * @returns {Promise<SupplierOrders | null>} A promise that resolves with the created supplier order.
   */
  static async createSupplierOrder(
    data: SupplierOrderCreationAttributes
  ): Promise<SupplierOrders | null> {
    const supplierOrder = await Database.SupplierOrder.create(data);
    if (!supplierOrder) {
      return null;
    }
    return supplierOrder;
  }

  /**
   * Get all supplier orders.
   * @param {string} [id] - The ID of the supplier order to get.
   * @returns {Promise<SupplierOrders[]>} A promise that resolves with an array of supplier orders.
   */
  static async getSupplierOrders(id: string): Promise<SupplierOrders[]> {
    const supplierOrders = await Database.SupplierOrder.findAll({
      where: {
        supplier_id: id,
      },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Database.User,
          as: 'supplier',
        },
        {
          model: Database.Order,
          as: 'order',
          include: [
            {
              model: Database.ProductOrder,
              as: 'product_orders',
              include: [
                {
                  model: Database.Product,
                  as: 'product',
                },
              ],
            },
          ],
        },
      ],
    });
    return supplierOrders;
  }

  /**
   * Get all supplier orders. for operator
   * @returns {Promise<SupplierOrders[]>} A promise that resolves with an array of supplier orders.
   */
  static async getSupplierOrdersForOperator(): Promise<SupplierOrders[]> {
    const supplierOrders = await Database.SupplierOrder.findAll({
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Database.User,
          as: 'supplier',
        },
        {
          model: Database.Order,
          as: 'order',
          include: [
            {
              model: Database.Product,
              as: 'product_orders',
            },
          ],
        },
      ],
    });
    return supplierOrders;
  }

  /**
   * Get a supplier order by its ID.
   * @param {string} id - The ID of the supplier order to get.
   * @returns {Promise<SupplierOrders | null>} A promise that resolves with the supplier order.
   */
  static async getSupplierOrderById(
    id: string
  ): Promise<SupplierOrders | null> {
    const supplierOrder = await Database.SupplierOrder.findOne({
      where: { id },
      include: [
        {
          model: Database.User,
          as: 'supplier',
        },
        {
          model: Database.Order,
          as: 'order',
          include: [
            {
              model: Database.Product,
              as: 'product_orders',
            },
          ],
        },
      ],
    });
    return supplierOrder;
  }

  /**
   * Update a supplier order.
   * @param {string} id - The ID of the supplier order to update.
   * @param {SupplierOrderAttributes} data - The data to update the supplier order with.
   * @returns {Promise<[number, SupplierOrders[]]>} A promise that resolves with an array containing the number of rows affected and the updated supplier order.
   */
  static async updateSupplierOrder(
    id: string,
    data: SupplierOrderAttributes
  ): Promise<[number, SupplierOrders[]]> {
    const updatedSupplierOrder = await Database.SupplierOrder.update(data, {
      where: { id },
      returning: true,
    });
    return updatedSupplierOrder;
  }

  /**
   * Delete a supplier order.
   * @param {string} id - The ID of the supplier order to delete.
   * @returns {Promise<number>} A promise that resolves with the number of rows affected.
   */
  static async deleteSupplierOrder(id: string): Promise<number> {
    const deletedSupplierOrder = await Database.SupplierOrder.destroy({
      where: { id },
    });
    return deletedSupplierOrder;
  }

  /**
   * @param {string} id
   * @param {string}status
   * @returns  {Promise<[number, SupplierOrders[]]>} A promise that resolves with an array containing the number of rows affected and the updated supplier order.
   *
   */
  static async updateSupplierOrderStatus(
    id: string,
    status: string
  ): Promise<[number, SupplierOrders[]]> {
    const updatedSupplierOrder = await Database.SupplierOrder.update(
      { status },
      {
        where: { id },
        returning: true,
      }
    );
    return updatedSupplierOrder;
  }
}
