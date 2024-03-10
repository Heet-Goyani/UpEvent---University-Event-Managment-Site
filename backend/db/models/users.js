import { Sequelize, DataTypes, Model } from "sequelize";
import { sequelize } from "../connection.js";
import bcrypt from "bcrypt";

// Some values are set to allowNull: true for testing purposes. Change them to false later.

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      // allowNull: false,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    college: {
      type: DataTypes.STRING,
      // allowNull: false,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        try {
          let salt = bcrypt.genSaltSync(10);
          let hash = bcrypt.hashSync(value, salt);
          this.setDataValue("password", hash);
        } catch (err) {
          throw new Error(err);
        }
      },
    },
    instagram: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    linkedin: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    facebook: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    twitter: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    profilePic: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue:
        "https://simplyilm.com/wp-content/uploads/2017/08/temporary-profile-placeholder-1.jpg",
    },
  },
  {
    sequelize,
    modelName: "users",
    tableName: "users",
  }
);

export default User;
