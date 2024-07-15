import { Router } from "express";
import { buyTicketController } from "../controllers/ticket.controller";

const router = Router();

router.post("/buy-ticket", buyTicketController);

export default router;
