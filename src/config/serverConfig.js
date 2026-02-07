const dotenv = require("dotenv");

dotenv.config()

module.exports = {
    PORT: process.env.PORT,
    EMAIL: process.env.EMAIL,
    GMAIL_APP_PASSWORD: process.env.GMAIL_APP_PASSWORD
}