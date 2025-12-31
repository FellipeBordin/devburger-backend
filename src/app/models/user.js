import { Model, DataTypes } from "sequelize";
import bcrypt from "bcrypt"

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.VIRTUAL,
        password_hash: DataTypes.STRING,
        admin: DataTypes.BOOLEAN,
      },
      {
        sequelize,
        tableName: "users",
        underscored: true,
        timestamps: true,
      }
    );

    this.addHook("beforeSave", async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 10);
      }
    });
    return this;
  }

async checkPassword(password) {
   return bcrypt.compare(password, this.password_hash)
  }
}


export default User;
