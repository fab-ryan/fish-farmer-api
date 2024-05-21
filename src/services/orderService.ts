/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
import Database, {
  Order,
  OrderCreationAttributes,
  ProductOrderCreationAttributes,
  Role,
} from '../database';

/**
 * OrderService class
 */
export class OrderService {
  /**
   * Create a new order.
   * @param data - The data for the new order.
   * @returns The created order or null if an error occurred.
   */
  static async createOrder(
    data: OrderCreationAttributes & ProductOrderCreationAttributes
  ) {
    const orderNumber = OrderService.generateOrderNumber();
    const order = await Database.Order.create({
      user_id: data.user_id,
      order_number: orderNumber,
      status: 'pending',
    });
    await Database.ProductOrder.create({
      order_id: order.id,
      product_id: data.product_id,
      quantity: data.quantity,
    });
    return order;
  }

  static async getOrders({
    userId,
    role,
  }: {
    userId: string;
    role: Role;
  }): Promise<Order[] | null> {
    const whereCondition = role.name === 'user' ? { user_id: userId } : {};
    const orders = await Database.Order.findAll({
      order: [['createdAt', 'DESC']],
      where: { ...whereCondition },
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
        {
          model: Database.User,
          as: 'user',
          attributes: ['id', 'first_name', 'last_name', 'email', 'phone'],
        },
      ],
    });
    return orders;
  }

  static async getOrderById(id: string): Promise<Order | null> {
    const order = await Database.Order.findOne({
      where: { id },
      include: [
        {
          model: Database.ProductOrder,
          as: 'products',
        },
        {
          model: Database.User,
          as: 'user',
        },
      ],
    });
    if (!order) {
      return null;
    }
    return order;
  }

  static async updateOrder(
    id: string,
    data: Partial<OrderCreationAttributes & ProductOrderCreationAttributes>
  ): Promise<Order | null> {
    const order = await Database.Order.findOne({
      where: { id },
    });
    if (!order) {
      return null;
    }
    await order.update({
      status: data.status,
    });
    return order;
  }

  static async deleteOrder(id: string): Promise<boolean> {
    const order = await Database.Order.findOne({ where: { id } });
    if (!order) {
      return false;
    }
    await order.destroy();
    return true;
  }

  static generateOrderNumber(): string {
    const orderNumber = Math.floor(100000 + Math.random() * 900000);
    return orderNumber.toString().toUpperCase();
  }

  static async updateOrderStatus(
    orderId: string,
    status: string
  ): Promise<Order | null> {
    const order = await Database.Order.findOne({
      where: { id: orderId },
    });
    if (!order) {
      return null;
    }
    await order.update({
      status,
    });
    const productOrders = await Database.ProductOrder.findOne({
      where: { order_id: orderId },
    });
    if (!productOrders) {
      return null;
    }

    const product = await Database.Product.findOne({
      where: { id: productOrders?.product_id },
    });
    if (!product) {
      return null;
    }
    if (status === 'completed') {
      await product.update({
        quantity: product.quantity - productOrders.quantity,
      });
    }

    return order;
  }
}
