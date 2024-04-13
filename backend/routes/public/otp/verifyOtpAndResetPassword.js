import { Router } from "express";
const router = Router();

// Controller imports
import {
  verifyUserOtp,
  verifyOrganiserOtp,
} from "../../../controllers/public/otp/verifyOtpAndResetPassword.js";

// Middleware imports

// Model imports

// Testing Remaining

router.post("/user/verifyotp", verifyUserOtp);
router.post("/organiser/verifyotp", verifyOrganiserOtp);

export default router;
