import * as fs from "fs"
import * as path from "path"
import * as Sequelize from "sequelize"
import { DbConnection } from "../interfaces/DbConnectionInterface";

const basename: string = path.basename(module.filename)
const env: string = process.env.NODE_ENV || 'development'

let config = require(path.resolve(`${__dirname}./../config/config.json`))[env];
let db = null;

if (!db) {
  db = {};

  const sequelize: Sequelize.Sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
      host: process.env.MYSQL_HOST || 'localhost',
      dialect: 'mysql',

      pool: {
        max: 5,
        min: 0,
        idle: 10000
      }
    });

  fs
    .readdirSync(__dirname)
    .filter((file: string) => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach((file: string) => {
      const model = sequelize.import(path.join(__dirname, file));
      db[model['name']] = model;
    })

  db.user;

  Object.keys(db).forEach((modelName: string) => {
    if (db[modelName].associate) {
      db[modelName].associate(db)
    }
  })

  db['sequelize'] = sequelize;
}

export default <DbConnection>db;