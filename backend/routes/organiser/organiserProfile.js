import { Router } from "express";
const router = Router();

// Controller imports
import {
  getProfile,
  updateProfile,
  deleteProfile,
} from "../../controllers/organiser/organiserProfile.js";

// Middleware imports
import isOrganiser from "../../middlewares/auth/isOrganiser.js";

// Model imports

router.get("/", isOrganiser, getProfile); // Public route
router.patch("/", isOrganiser, updateProfile);
router.delete("/", isOrganiser, deleteProfile);

export default router;
