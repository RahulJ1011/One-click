const Notification = require('../models/notification');

const createNotification = async (req, res) => {
    try {
        const { userId, type, message } = req.body;

        const notification = new Notification({ userId, type, message });
        const savedNotification = await notification.save();

        // Emit the notification via Socket.IO
        const io = req.app.get('io');
        io.to(userId.toString()).emit('notification', savedNotification);

        res.status(201).json(savedNotification);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create notification', details: error.message });
    }
};

const getUserNotifications = async (req, res) => {
    try {
        const { userId } = req.params;
        const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });

        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch notifications', details: error.message });
    }
};


module.exports = {createNotification,getUserNotifications}