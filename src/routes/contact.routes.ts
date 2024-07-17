import { Router } from "express";
import { sendEmailController } from "../controllers/contact.controller";

const router = Router();

router.post("/send-email", sendEmailController);

export default router;