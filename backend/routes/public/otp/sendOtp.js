import { Router } from "express";
const router = Router();

// Controller imports
import {
  sendOtpToUser,
  sendOtpToOrganiser,
} from "../../../controllers/public/otp/sendOtp.js";

// Middleware imports

// Model imports

// Testing Remaining

router.post("/user/sendotp", sendOtpToUser);
router.post("/organiser/sendotp", sendOtpToOrganiser);

export default router;
