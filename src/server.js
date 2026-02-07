const express = require("express");
const { PORT } = require("./config/serverConfig.js");

const setupAndStartServer = () => {
    const app = express();

    app.use(express.urlencoded({extended: true}));
    app.use(express.json());

    app.listen(PORT, () => {
        console.log(`Server Running At PORT:${PORT}`);
    })
}

setupAndStartServer();