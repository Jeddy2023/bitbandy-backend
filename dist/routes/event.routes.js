"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const event_controller_1 = require("../controllers/event.controller");
const isLoggedIn_middleware_1 = require("../middleware/isLoggedIn.middleware");
const isAdmin_middleware_1 = require("../middleware/isAdmin.middleware");
const multer_config_1 = require("../config/multer-config");
const router = (0, express_1.Router)();
router.post("/create-event", isLoggedIn_middleware_1.isLoggedIn, isAdmin_middleware_1.isAdmin, (req, res, next) => {
    multer_config_1.upload.single("eventImage")(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: "Validation Error", errors: err });
        }
        next();
    });
}, event_controller_1.createEventController);
router.put("/update/:id", isLoggedIn_middleware_1.isLoggedIn, isAdmin_middleware_1.isAdmin, event_controller_1.updateEventController);
router.delete("/delete-event/:id", isLoggedIn_middleware_1.isLoggedIn, isAdmin_middleware_1.isAdmin, event_controller_1.deleteEventController);
router.get("/event/:id", event_controller_1.getEventByIdController);
router.get("/admin/event/:id", isLoggedIn_middleware_1.isLoggedIn, isAdmin_middleware_1.isAdmin, event_controller_1.getEventByIdForAdminController);
router.get("/", event_controller_1.getAllEventsController);
router.get("/admin/events", isLoggedIn_middleware_1.isLoggedIn, isAdmin_middleware_1.isAdmin, event_controller_1.getAllEventsForAdminController);
exports.default = router;
