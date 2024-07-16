import { Router } from "express";
import { createEventController, deleteEventController, getAllEventsController, getAllEventsForAdminController, getEventByIdController, getEventByIdForAdminController, getLatestEventController, updateEventController } from "../controllers/event.controller";
import { isLoggedIn } from "../middleware/isLoggedIn.middleware";
import { isAdmin } from "../middleware/isAdmin.middleware";
import { upload } from "../config/multer-config";

const router = Router();

router.post("/create-event", isLoggedIn, isAdmin, (req, res, next) => {
    upload.single("eventImage")(req, res, (err: any) => {
        if (err) {
            return res.status(400).json({ message: "Validation Error", errors: err });
        }
        next();
    });
}, createEventController);
router.put("/update/:id", isLoggedIn, isAdmin, (req, res, next) => {
    upload.single("eventImage")(req, res, (err: any) => {
        if (err) {
            return res.status(400).json({ message: "Validation Error", errors: err });
        }
        next();
    });
}, updateEventController);
router.delete("/delete-event/:id", isLoggedIn, isAdmin, deleteEventController);
router.get("/event/:id", getEventByIdController);
router.get("/admin/event/:id", isLoggedIn, isAdmin, getEventByIdForAdminController);
router.get("/", getAllEventsController);
router.get("/latest-event", getLatestEventController);
router.get("/admin/events", isLoggedIn, isAdmin, getAllEventsForAdminController);

export default router;