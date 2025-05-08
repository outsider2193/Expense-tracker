const express = require("express");
const router = express.Router();
const {
    getNotifications,
    createNotification,
    markAsRead,
    deleteNotification
} = require("../controllers/NotificationController");

// Route to get all notifications for a user
router.get("/notifications", getNotifications);

// Route to create a new notification
router.post("/notifications", createNotification);

// Route to mark a notification as read
router.put("/notifications/:id/read", markAsRead);

// Route to delete a notification
router.delete("/notifications/:id", deleteNotification);

module.exports = router;