const express = require('express');
const bodyParser = require('body-parser');
const {PORT} = require('./config/serverConfig');
const apiRoutes = require('./routes/index');
const app = express();

// const { User } = require('./models/index');
// const bcrypt = require('bcrypt');
// const UserRepository = require('./repository/user-repository');

const preapareAndStartServer = () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use('/api', apiRoutes);

    app.listen(PORT, async () => {
        console.log(`Server started on: ${PORT}`);

        // const obj = new UserRepository();
        // const response = await obj.getById(1);
        // console.log(response);

        /* const incomingPass = "pass34546";
        const user = await User.findByPk(5);
        const response = bcrypt.compareSync(incomingPass, user.password);
        console.log(response);  */
    });
}

preapareAndStartServer();