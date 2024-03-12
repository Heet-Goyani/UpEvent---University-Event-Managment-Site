import { Router } from "express";
const router = Router();

// Controller imports
import {
  Bookmark,
  getBookmarkedList,
  getBookmarked,
} from "../../controllers/user/bookmarkEvent.js";

// Middleware imports
import isUser from "../../middlewares/auth/isUser.js";

// Model imports
// import bookmarkEvent from "../../db/models/bookmarkEvents.js";
// import Event from "../../db/models/events.js";
// import User from "../../db/models/users.js";

router.post("/bookmarkevent/:id", isUser, Bookmark);
router.get("/bookmarkevent/:id", isUser, getBookmarked);
router.get("/bookmarkevent", isUser, getBookmarkedList);

export default router;
