import { Router } from "express";
const router = Router();

// Controller imports
import {
  getProfile,
  updateProfile,
  deleteProfile,
} from "../../controllers/user/userProfile.js";

// Middleware imports
import isUser from "../../middlewares/auth/isUser.js";

// Model imports

router.get("/", isUser, getProfile);
router.patch("/", isUser, updateProfile);
router.delete("/", isUser, deleteProfile);

export default router;
