import Sequelize, { Model } from "sequelize";

class Product extends Model {
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
        price: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
        },
        path: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        offer: {
          type: Sequelize.BOOLEAN, 
          allowNull: false,
          defaultValue: false,
        },
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return this.path
              ? `http://localhost:3001/product-files/${this.path}`
              : null;
          },
        },
      },
      {
        sequelize,
        tableName: "products",
        createdAt: "created_at",
        updatedAt: "updated_at",
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Category, {
      foreignKey: "category_id",
      as: "category",
    });
  }
}

export default Product;