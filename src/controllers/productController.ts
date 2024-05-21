/* eslint-disable no-restricted-syntax */
import { Request, Response } from 'express';
import { sendResponse, fileUpload } from '../utils';
import { ProductService } from '../services';

const handlleProductUpload = async (req: Request): Promise<string[]> => {
  const images: string[] = [];
  if (req.files) {
    const files = Array.isArray(req.files)
      ? req.files
      : Object.values(req.files);
    for (const file of files) {
      // eslint-disable-next-line no-await-in-loop
      const imageUrl = await fileUpload(
        file as Express.Multer.File | undefined,
        'products'
      );
      images.push(imageUrl);
    }
  }
  return images;
};

const createProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const productExists = await ProductService.isProductExist(req.body.name);
    if (productExists) {
      return sendResponse(res, 403, null, 'Product already exists');
    }
    if (req.files) {
      req.body.images = await handlleProductUpload(req);
      [req.body.thumbnail] = req.body.images;
    }
    const data = req.body;
    const product = await ProductService.createProduct(data);
    if (!product) {
      return sendResponse(res, 500, null, 'Error creating product');
    }
    return sendResponse(res, 201, product, 'Product created', 'product');
  } catch (error) {
    const { message } = error as Error;
    return sendResponse(res, 500, null, message);
  }
};

const getProducts = async (req: Request, res: Response): Promise<Response> => {
  try {
    const products = await ProductService.getProducts();
    if (!products) {
      return sendResponse(res, 404, null, 'No products found');
    }
    return sendResponse(res, 200, products, 'Products retrieved', 'products');
  } catch (error) {
    const { message } = error as Error;
    return sendResponse(res, 500, null, message);
  }
};

const getProductBySlug = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { slug } = req.params;
    const product = await ProductService.getProductBySlug(slug);
    if (!product) {
      return sendResponse(res, 404, null, 'Product not found');
    }
    return sendResponse(res, 200, product, 'Product retrieved', 'product');
  } catch (error) {
    const { message } = error as Error;
    return sendResponse(res, 500, null, message);
  }
};

export const productController = {
  createProduct,
  getProducts,
  getProductBySlug,
};
