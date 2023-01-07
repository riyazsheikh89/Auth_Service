const express = require('express');
const bodyParser = require('body-parser');
const {PORT, JWT_KEY} = require('./config/serverConfig');
const apiRoutes = require('./routes/index');
const app = express();

const UserService = require('./services/user-service');

const preapareAndStartServer = () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use('/api', apiRoutes);

    app.listen(PORT, async () => {
        console.log(`Server started on: ${PORT}`);
        
    });
}

preapareAndStartServer();