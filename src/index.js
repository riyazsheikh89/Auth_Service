const express = require('express');
const {PORT} = require('./config/serverConfig');
const app = express();

const preapareAndStartServer = () => {
    app.listen(PORT, () => {
        console.log(`Server started on: ${PORT}`);
    });
}

preapareAndStartServer();