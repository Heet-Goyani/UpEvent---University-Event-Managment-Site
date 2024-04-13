import { Router } from "express";
const router = Router();

// Controller imports
import { getUserDetails, getUserList } from "../../controllers/public/user.js";

// Middleware imports

// Model imports

router.get("/users", getUserList);
router.get("/users/:id", getUserDetails);

export default router;
