const express = require("express");
const { PORT, REMINDER_BINDING_KEY } = require("./config/serverConfig.js");
const { setupJobs } = require("./utils/jobs.js");
const apiRoutes = require("./routes/index.js");

const { createChannel, subscribeMessage } = require("./utils/messageQueue.js");

const setupAndStartServer = async () => {
    const app = express();

    app.use(express.urlencoded({extended: true}));
    app.use(express.json());

    app.use("/api", apiRoutes);

    const channel = await createChannel();
    subscribeMessage(channel, undefined, REMINDER_BINDING_KEY);

    app.listen(PORT, () => {
        console.log(`Server Running At PORT:${PORT}`);
    });
    // setupJobs();
}

setupAndStartServer();