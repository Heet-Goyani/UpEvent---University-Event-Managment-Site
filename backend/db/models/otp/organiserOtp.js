import { Sequelize, Model } from "sequelize";
import { sequelize } from "../../connection.js";
import Organiser from "../organisers.js";

class OrganiserOtp extends Model {}

OrganiserOtp.init(
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true,
      references: {
        model: Organiser,
        key: "id",
      },
    },
    otp: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1000,
        max: 9999,
      },
    },
    expiry: {
      type: Sequelize.DataTypes.DATE,
      allowNull: false,
      set(value) {
        let date = new Date();
        date.setMinutes(date.getMinutes() + 60);
        this.setDataValue("expiry", date);
      },
    },
  },
  {
    sequelize,
    modelName: "organiserOtp",
  }
);

export default OrganiserOtp;
