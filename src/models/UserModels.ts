import * as Sequelize from "sequelize";
import { BaseModelInterface } from "../interfaces/BaseModelInterface";
// src/typings/SequelizeAttributes/index.d.ts
import { DataTypeAbstract, DefineAttributeColumnOptions } from "sequelize";

type SequelizeAttribute = string | DataTypeAbstract | DefineAttributeColumnOptions;

export type SequelizeAttributes<T extends { [key: string]: any }> = {
  [P in keyof T]: SequelizeAttribute
};

export interface UserAttributes {
  id?: any;
  name: string;
  email: string;
  password?: string;
}

export interface UserInstance extends Sequelize.Instance<UserAttributes>, UserAttributes {
  isPassword(encodePassword: string, password: string): boolean;
}

export interface UserModel extends BaseModelInterface, Sequelize.Model<UserInstance, UserAttributes> { }

export default (sequelize: Sequelize.Sequelize, DataType: Sequelize.DataTypes): Sequelize.Model<UserInstance, UserAttributes> => {
  const attr: SequelizeAttributes<UserAttributes> = {
    id: {
      type: DataType.NUMBER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataType.STRING(127),
    },
    email: {
      type: DataType.STRING(127)
    }
  };
  const user = sequelize.define<UserInstance, UserAttributes>('User', attr);
  return user;
}