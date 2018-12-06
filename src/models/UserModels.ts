import * as Sequelize from "sequelize";
import { BaseModelInterface } from "../interfaces/BaseModelInterface";
// src/typings/SequelizeAttributes/index.d.ts
import { DataTypeAbstract, DefineAttributeColumnOptions } from "sequelize";
import { genSaltSync, hash, hashSync, compareSync } from "bcryptjs";
import { ModelsInterface } from "../interfaces/ModelsInterface";

type SequelizeAttribute = string | DataTypeAbstract | DefineAttributeColumnOptions;

export type SequelizeAttributes<T extends { [key: string]: any }> = {
  [P in keyof T]: SequelizeAttribute
};

export interface UserAttributes {
  id?: any;
  name: string;
  email: string;
  password: string;
  createdAt?: string;
  updatedAt?: string;
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
      allowNull: false,
    },
    email: {
      type: DataType.STRING(127),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataType.STRING(128),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  };
  const user: UserModel = sequelize.define<UserInstance, UserAttributes>('User', attr, {
    tableName: "users",
    hooks: {
      beforeCreate: (user: UserInstance, options: Sequelize.CreateOptions): void => {
        const salt = genSaltSync();
        user.password = hashSync(user.password, salt);
      }
    }
  });

  user.associate = (models: ModelsInterface) => { };

  user.prototype.isPassword = (encodePassword: string, password: string): boolean => {
    return compareSync(password, encodePassword);
  }
  return user;
}