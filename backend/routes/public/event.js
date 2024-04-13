import { Router } from "express";
const router = Router();

// Controller imports
import {getEventList, getEvent} from "../../controllers/public/event.js";

// Middleware imports

// Model imports

router.post("/events", getEventList);
router.get("/events/:id", getEvent);


export default router;
