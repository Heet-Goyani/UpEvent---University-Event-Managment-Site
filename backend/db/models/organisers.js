import { Sequelize, DataTypes, Model } from "sequelize";
import { sequelize } from "../connection.js";
import bcrypt from "bcrypt";

// Some values are set to allowNull: true for testing purposes. Change them to false later.

class Organiser extends Model {}

Organiser.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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
    profilePic: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue:
        "https://simplyilm.com/wp-content/uploads/2017/08/temporary-profile-placeholder-1.jpg",
    },
    coverPic: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue:
        "https://simplyilm.com/wp-content/uploads/2017/08/temporary-profile-placeholder-1.jpg",
    },
    about: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
  {
    sequelize,
    modelName: "organisers",
    tableName: "organisers",
  }
);

export default Organiser;
