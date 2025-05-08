const Notification = require("../models/NotificationModel");

// Get all notifications for a user
exports.getNotifications = async (req, res) => {
    try {
        const { userId } = req.query;
        const notifications = await Notification.find({ userId }).sort({ date: -1 });
        res.status(200).json({ message: "Notifications fetched successfully", data: notifications });
    } catch (error) {
        res.status(500).json({ message: "Error fetching notifications", error });
    }
};

// Create a new notification
exports.createNotification = async (req, res) => {
    try {
        const { userId, message, type } = req.body;
        const newNotification = await Notification.create({ userId, message, type });
        res.status(201).json({ message: "Notification created successfully", data: newNotification });
    } catch (error) {
        res.status(500).json({ message: "Error creating notification", error });
    }
};

// Mark a notification as read
exports.markAsRead = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedNotification = await Notification.findByIdAndUpdate(id, { isRead: true }, { new: true });
        if (!updatedNotification) {
            return res.status(404).json({ message: "Notification not found" });
        }
        res.status(200).json({ message: "Notification marked as read", data: updatedNotification });
    } catch (error) {
        res.status(500).json({ message: "Error updating notification", error });
    }
};

// Delete a notification
exports.deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedNotification = await Notification.findByIdAndDelete(id);
        if (!deletedNotification) {
            return res.status(404).json({ message: "Notification not found" });
        }
        res.status(200).json({ message: "Notification deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting notification", error });
    }
};