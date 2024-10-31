import { Router } from "express";
import { buyTicketController, deleteAllTicketsController } from "../controllers/ticket.controller";
import { isLoggedIn } from "../middleware/isLoggedIn.middleware";
import { isAdmin } from "../middleware/isAdmin.middleware";

const router = Router();

router.post("/buy-ticket", buyTicketController);
router.delete("/delete-all-tickets", isLoggedIn, isAdmin, deleteAllTicketsController);

export default router;
