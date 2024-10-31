import { Router } from "express";
import {
    createEmailSpamController,
    deleteEmailSpamController,
    getAllEmailSpamController,
    getEmailSpamByIdController,
    updateEmailSpamController,
} from "../controllers/emailspam.controller";
import { isLoggedIn } from "../middleware/isLoggedIn.middleware";
import { isAdmin } from "../middleware/isAdmin.middleware";

const router = Router();

router.post("/create-emailspam", createEmailSpamController);
router.put("/update/:id", isLoggedIn, isAdmin, updateEmailSpamController);
router.delete("/delete-emailspam/:id", isLoggedIn, isAdmin, deleteEmailSpamController);
router.get("/emailspam/:id", isLoggedIn, isAdmin, getEmailSpamByIdController);
router.get("/", isLoggedIn, isAdmin, getAllEmailSpamController);

export default router;
