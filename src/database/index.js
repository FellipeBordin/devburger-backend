import { Sequelize } from "sequelize";
import User from "../app/models/user.js";
import config from "../config/database.cjs";
import Product from "../app/models/products.js";
import Category from "../app/models/categories.js";
import mongoose from "mongoose";

const Models = [User, Product, Category];

class Database {
  constructor() {
    this.connection = new Sequelize(config.development);
    this.init();
    this.mongo();
  }
  init() {
    Models.map((Model) => Model.init(this.connection))
    .map((model) => model.associate && model.associate(this.connection.models));
  }
  mongo() {
    this.mongoConnection =  mongoose.connect('mongodb://localhost:27017/devburger')
  }
}

const database = new Database();

export const sequelize = database.connection
export { User, Database };
