const validateUserAuth = (req, res, next) => {
    if(!req.body.email || !req.body.password) {
        return res.status(400).json({
            success: false,
            data: {},
            message: 'something went wrong in middlewares',
            err: "Email or Password is missing"
        })
    }
    next();
}

module.exports = {
    validateUserAuth
}