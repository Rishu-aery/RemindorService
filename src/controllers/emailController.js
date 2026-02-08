const { createNotification } = require("../services/emailService.js");

const create = async (req, res) => {
    try {
        const body = req.body;
        const result = await createNotification(body);
        res.status(200).json({
            data: result,
            message: "Email Notification Registered Successfully.",
            success: true
        })
    } catch (error) {
        res.status(500).json({
            data: null,
            success: false,
            error: error
        })
        
    }
}

module.exports = {
    create
}