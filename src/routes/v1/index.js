const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/user-controller');
const {AuthRequestValidators} = require('../../middlewares/index');

router.post('/signup',
    AuthRequestValidators.validateUserAuth,
    UserController.create
    );
router.post('/signin',
    AuthRequestValidators.validateUserAuth,
    UserController.signIn
    );
router.get('/isAuthenticated', UserController.isAuthenticated);


module.exports = router;