const express = require("express");
const { PORT } = require("./config/serverConfig.js");
const { setupJobs } = require("./utils/jobs.js");
const apiRoutes = require("./routes/index.js");

const setupAndStartServer = () => {
    const app = express();

    app.use(express.urlencoded({extended: true}));
    app.use(express.json());

    app.use("/api", apiRoutes);

    app.listen(PORT, () => {
        console.log(`Server Running At PORT:${PORT}`);
    });
    setupJobs();
}

setupAndStartServer();