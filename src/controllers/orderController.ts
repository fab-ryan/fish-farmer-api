import { Request, Response } from 'express';
import { sendResponse } from '../utils';
import { OrderService, ProductService } from '../services';
import { Role } from '../database';

const createOrder = async (req: Request, res: Response): Promise<Response> => {
  try {
    type User = { id: string };

    const { id } = req?.user as User;
    const product = await ProductService.getProductBySlug(req.body.product_id);
    if (!product) {
      return sendResponse(res, 404, null, 'Product not found');
    }
    const order = await OrderService.createOrder({
      ...req.body,
      user_id: id,
      product_id: product.id,
    });
    if (!order) {
      return sendResponse(res, 500, null, 'Error creating order');
    }
    return sendResponse(res, 201, order, 'Order created', 'order');
  } catch (error) {
    const { message } = error as Error;
    return sendResponse(res, 500, null, message);
  }
};

const getOrders = async (_req: Request, res: Response): Promise<Response> => {
  try {
    type User = { id: string; role: Role };

    const { id, role } = _req?.user as User;
    const orders = await OrderService.getOrders({
      userId: id,
      role,
    });
    if (!orders) {
      return sendResponse(res, 404, null, 'No orders found');
    }
    return sendResponse(res, 200, orders, 'Orders retrieved', 'orders');
  } catch (error) {
    const { message } = error as Error;
    return sendResponse(res, 500, null, message);
  }
};

const getOrderById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const order = await OrderService.getOrderById(req.params.id);
    if (!order) {
      return sendResponse(res, 404, null, 'Order not found');
    }
    return sendResponse(res, 200, order, 'Order retrieved', 'order');
  } catch (error) {
    const { message } = error as Error;
    return sendResponse(res, 500, null, message);
  }
};

const updateOrder = async (req: Request, res: Response): Promise<Response> => {
  try {
    const order = await OrderService.updateOrder(req.params.id, req.body);
    if (!order) {
      return sendResponse(res, 500, null, 'Error updating order');
    }
    return sendResponse(res, 200, order, 'Order updated', 'order');
  } catch (error) {
    const { message } = error as Error;
    return sendResponse(res, 500, null, message);
  }
};

const deleteOrder = async (req: Request, res: Response): Promise<Response> => {
  try {
    await OrderService.deleteOrder(req.params.id);
    return sendResponse(res, 200, null, 'Order deleted successfully');
  } catch (error) {
    const { message } = error as Error;
    return sendResponse(res, 500, null, message);
  }
};

const updateStatus = async (req: Request, res: Response): Promise<Response> => {
  try {
    const order = await OrderService.updateOrderStatus(
      req.params.id,
      req.body.status
    );
    if (!order) {
      return sendResponse(res, 500, null, 'Error updating order status');
    }
    return sendResponse(res, 200, order, 'Order status updated', 'order');
  } catch (error) {
    const { message } = error as Error;
    return sendResponse(res, 500, null, message);
  }
};

const orderController = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  updateStatus,
};

export { orderController };
