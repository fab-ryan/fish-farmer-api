import { Request, Response } from 'express';
import { SupplierOrdersService } from '../services';
import { sendResponse } from '../utils';

/**
 * Get all supplier orders.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<Response>} A promise that resolves with the supplier orders.
 */
const getSupplierOrders = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.user as { id: string };
    const supplierOrders = await SupplierOrdersService.getSupplierOrders(id);
    if (!supplierOrders) {
      return sendResponse(res, 404, null, 'No supplier orders found');
    }
    return sendResponse(
      res,
      200,
      supplierOrders,
      'Supplier orders retrieved',
      'supplier_orders'
    );
  } catch (error) {
    const { message } = error as Error;
    return sendResponse(res, 500, null, message);
  }
};

/**
 * Get a supplier order by its ID.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<Response>} A promise that resolves with the supplier order.
 */
const getSupplierOrderById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const supplierOrder = await SupplierOrdersService.getSupplierOrderById(id);
    if (!supplierOrder) {
      return sendResponse(res, 404, null, 'Supplier order not found');
    }
    return sendResponse(res, 200, supplierOrder, 'Supplier order retrieved');
  } catch (error) {
    const { message } = error as Error;
    return sendResponse(res, 500, null, message);
  }
};

/**
 * Create a supplier order.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<Response>} A promise that resolves with the created supplier order.
 */
const createSupplierOrder = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const data = req.body;
    const supplierOrder = await SupplierOrdersService.createSupplierOrder({
      ...data,
    });
    return sendResponse(res, 201, supplierOrder, 'Supplier order created');
  } catch (error) {
    const { message } = error as Error;
    return sendResponse(res, 500, null, message);
  }
};

/**
 * update a supplier order.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<Response>} A promise that resolves with the updated supplier order.
 *
 */

const updateSupplierOrder = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const data = req.body;
    const supplierOrder = await SupplierOrdersService.updateSupplierOrder(
      id,
      data
    );
    return sendResponse(res, 200, supplierOrder, 'Supplier order updated');
  } catch (error) {
    const { message } = error as Error;
    return sendResponse(res, 500, null, message);
  }
};

/**
 * delete a supplier order.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<Response>} A promise that resolves with the deleted supplier order.
 */
const deleteSupplierOrder = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    await SupplierOrdersService.deleteSupplierOrder(id);
    return sendResponse(res, 200, null, 'Supplier order deleted');
  } catch (error) {
    const { message } = error as Error;
    return sendResponse(res, 500, null, message);
  }
};

const operatorGetAllSupplierOrders = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const supplierOrders =
      await SupplierOrdersService.getSupplierOrdersForOperator();
    if (!supplierOrders) {
      return sendResponse(res, 404, null, 'No supplier orders found');
    }
    return sendResponse(
      res,
      200,
      supplierOrders,
      'Supplier orders retrieved',
      'supplier_orders'
    );
  } catch (error) {
    const { message } = error as Error;
    return sendResponse(res, 500, null, message);
  }
};

const updateSupplierOrderStatus = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const supplierOrder = await SupplierOrdersService.updateSupplierOrderStatus(
      id,
      status
    );
    return sendResponse(
      res,
      200,
      supplierOrder,
      'Supplier order status updated',
      'supplier_order'
    );
  } catch (error) {
    const { message } = error as Error;
    return sendResponse(res, 500, null, message);
  }
};

const SupplierOrdersController = {
  getSupplierOrders,
  getSupplierOrderById,
  createSupplierOrder,
  updateSupplierOrder,
  deleteSupplierOrder,
  operatorGetAllSupplierOrders,
  updateSupplierOrderStatus,
};

/**
 * A module that exports the supplier orders controller.
 * @type {Object}
 * @const {Function} getSupplierOrders - Get all supplier orders.
 * @const {Function} getSupplierOrderById - Get a supplier order by its ID.
 * @const {Function} createSupplierOrder - Create a supplier order.
 * @const {Function} updateSupplierOrder - Update a supplier order.
 * @const {Function} deleteSupplierOrder - Delete a supplier order.
 * @const {Function} operatorGetAllSupplierOrders - Get all supplier orders for an operator.
 * @const {Function} updateSupplierOrderStatus - Update a supplier order status.
 * @default
 */
export { SupplierOrdersController };
