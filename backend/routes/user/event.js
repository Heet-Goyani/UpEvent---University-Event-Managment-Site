import { Router } from "express";
const router = Router();

// Controller imports
import {
  Register,
  Bookmark,
  getEventDetails,
  getAllEventList,
  getRegisteredEventList,
  getBookmarkedEventList,
  isRegistered,
  isBookmarked,
} from "../../controllers/user/event.js";

// Middleware imports
import isUser from "../../middlewares/auth/isUser.js";

// Model imports

router.post("/registerevent/:id", isUser, Register);
router.post("/bookmarkevent/:id", isUser, Bookmark);
router.get("/isregistered/:id", isUser, isRegistered);
router.get("/isbookmarked/:id", isUser, isBookmarked);
router.get("/events", isUser, getAllEventList);
router.get("/events/:id", isUser, getEventDetails);
router.get("/bookmarkedevents", isUser, getBookmarkedEventList);
router.get("/registeredevents", isUser, getRegisteredEventList);

export default router;
