import { Router } from "express";
const router = Router();

// Controller imports
import {
  getOrganiserDetails,
  getOrganiserList,
} from "../../controllers/public/organiser.js";

// Middleware imports

// Model imports

router.get("/organisers", getOrganiserList);
router.get("/organisers/:id", getOrganiserDetails);

export default router;
