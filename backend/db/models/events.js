import { Sequelize, Model } from "sequelize";
import { sequelize } from "../connection.js";
import Organiser from "./organisers.js";

class Event extends Model {}

// Some values are set to allowNull: true for testing purposes. Change them to false later.

Event.init(
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    organiserId: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true,
      references: {
        model: Organiser,
        key: "id",
      },
    },
    name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.DataTypes.TEXT("long"),
      allowNull: false,
      allowNull: true,
    },
    genre: {
      type: Sequelize.DataTypes.ENUM(
        "technical",
        "cultural",
        "literary",
        "sports",
        "other"
      ),
      allowNull: false,
      defaultValue: "other",
    },
    date: {
      type: Sequelize.DataTypes.DATE,
      allowNull: false,
    },
    time: {
      type: Sequelize.DataTypes.TIME,
      allowNull: false,
    },
    notificationDate: {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
    },
    notificationTime: {
      type: Sequelize.DataTypes.TIME,
      allowNull: false,
      defaultValue: "12:00:00",
    },
    available: {
      type: Sequelize.DataTypes.ENUM("online", "offline"),
      allowNull: false,
      defaultValue: "offline",
    },
    venue: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
      // validate: {
      //   validateVenue(value) {
      //     if (this.available === "offline" && !value) {
      //       throw new Error("Venue is required for offline events");
      //     }
      //   },
      // },
    },
    meetLink: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
      // validate: {
      //   isUrl: true,
      //   validateMeetLink(value) {
      //     if (this.available === "online" && !value) {
      //       throw new Error("Meet link is required for online events");
      //     }
      //   },
      // },
    },
    personalizedRegisteration: {
      type: Sequelize.DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    registerationLink: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
      // validate: {
      //   isUrl: true,
      //   nullCheck(value) {
      //     if (this.personalizedRegisteration && !value) {
      //       throw new Error(
      //         "Registeration link is required for personalized registeration"
      //       );
      //     }
      //   },
      // },
    },
    coverImage: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
      defaultValue: "https://via.placeholder.com/150",
    },
    reachUsAt: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },
    instagram: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    linkedin: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    facebook: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    twitter: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "events",
    tableName: "events",
  }
);

export default Event;
