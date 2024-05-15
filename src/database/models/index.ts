import { Sequelize } from 'sequelize';
import RoleModel from './role';
import UserModel from './user';

export * from './role';
export * from './user';

const Model = (sequelize: Sequelize) => {
  const Role = RoleModel(sequelize);
  const User = UserModel(sequelize);

  return { Role, User };
};

export default Model;
