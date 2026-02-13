const dotenv = require("dotenv");

dotenv.config()

module.exports = {
    PORT: process.env.PORT,
    EMAIL: process.env.EMAIL,
    GMAIL_APP_PASSWORD: process.env.GMAIL_APP_PASSWORD,
    EXCHANGE_NAME: process.env.EXCHANGE_NAME,
    REMINDER_BINDING_KEY: process.env.REMINDER_BINDING_KEY,
    MESSAGE_BROCKER_URL: process.env.MESSAGE_BROCKER_URL,
    QUEUE_NAME: process.env.QUEUE_NAME
}