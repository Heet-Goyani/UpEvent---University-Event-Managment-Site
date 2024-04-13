import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize, testConnection } from "./db/connection.js";

const app = express();
app.use(bodyParser.json());
app.use(cors());

dotenv.config();

// Model imports
import User from "./db/models/users.js";
import Organiser from "./db/models/organisers.js";
import Event from "./db/models/events.js";
import registerEvent from "./db/models/registerEvents.js";
import bookmarkEvent from "./db/models/bookmarkEvents.js";
import OrganiserOtp from "./db/models/otp/organiserOtp.js";
import UserOtp from "./db/models/otp/userOtp.js";

// Auth imports
import userRoutes from "./routes/user/auth.js";
import organiserRoutes from "./routes/organiser/auth.js";

// Public route imports
import publicEventRoutes from "./routes/public/event.js";
import publicUserRoutes from "./routes/public/user.js";
import publicOrganiserRoutes from "./routes/public/organiser.js";

// User route imports
import userEventRoutes from "./routes/user/event.js";
import userProfileRoutes from "./routes/user/userProfile.js";

// Organiser route imports
import organiserEventRoutes from "./routes/organiser/event.js";
import organiserProfileRoutes from "./routes/organiser/organiserProfile.js";

// Auth routes
app.use("/user/auth", userRoutes);
app.use("/organiser/auth", organiserRoutes);

// Public routes
app.use("/public", publicEventRoutes);
app.use("/public", publicUserRoutes);
app.use("/public", publicOrganiserRoutes);

// User routes
app.use("/user", userEventRoutes);
app.use("/user", userProfileRoutes);
// app.use("/user", userStatsRoutes);

// organiser routes
app.use("/organiser", organiserEventRoutes);
app.use("/organiser", organiserProfileRoutes);
// app.use("/organiser", organiserStatsRoutes);

app.get("/hello", (req, res) => {
  res.send("Hello World from UpEvent!!");
});

app.listen(3000, () => {
  testConnection();
  (async () => {
    bookmarkEvent.belongsTo(Event, {
      foreignKey: "eventId",
      onDelete: "CASCADE",
    });
    registerEvent.belongsTo(Event, {
      foreignKey: "eventId",
      onDelete: "CASCADE",
    });
    bookmarkEvent.belongsTo(User, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
    registerEvent.belongsTo(User, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
    OrganiserOtp.belongsTo(Organiser, {
      foreignKey: "organiserId",
      onDelete: "CASCADE",
    });
    UserOtp.belongsTo(User, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });

    // await sequelize.sync({ alter: true });
  })();
  console.log(
    "<<--------------------------------------------------------->>\n\nApplication is running, Use Ctrl + click on following URL :\nhttp://localhost:3000/hello\n\n<<--------------------------------------------------------->>"
  );
});
