import { Sequelize } from 'sequelize';
import RoleModel from './role';
import UserModel from './user';
import ProductModel from './product';
import OrderModel from './order';
import ProductOrderModel from './productOrder';
import SupplierOrders from './supplierOrders';

export * from './role';
export * from './user';
export * from './product';
export * from './order';
export * from './productOrder';
export * from './supplierOrders';

const Model = (sequelize: Sequelize) => {
  const Role = RoleModel(sequelize);
  const User = UserModel(sequelize);
  const Product = ProductModel(sequelize);
  const Order = OrderModel(sequelize);
  const ProductOrder = ProductOrderModel(sequelize);
  const SupplierOrder = SupplierOrders(sequelize);

  return { Role, User, Product, Order, ProductOrder, SupplierOrder };
};

export default Model;
