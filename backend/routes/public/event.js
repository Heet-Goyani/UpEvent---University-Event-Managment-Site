import { Router } from "express";
const router = Router();

// Controller imports
import {getEventList, getEvent, getEventListByOrganiser} from "../../controllers/public/event.js";

// Middleware imports

// Model imports

router.get("/events", getEventList);
router.post("/events", getEventListByOrganiser);
router.get("/events/:id", getEvent);

export default router;
