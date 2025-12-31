
import Sequelize, { Model } from "sequelize";

class Category extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        path: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return this.path
              ? `http://localhost:3001/category-files/${this.path}`
              : null;
          },
        },
      },
      {
        sequelize,
        tableName: "categories",
        createdAt: "created_at",
        updatedAt: "updated_at",
      }
    );
    return this;
  }

  static associate(models) {
    this.hasMany(models.Product, { foreignKey: "category_id", as: "products" });
  }
}

export default Category;
