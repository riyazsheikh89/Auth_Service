const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {JWT_KEY} = require('../config/serverConfig');
const UserRepository = require('../repository/user-repository');

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(data) {
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong at service layer!");
            throw error;
        }
    }

    async signIn(email, plainPassword) {
        try {
            // step:1 -> get the user by the eamil
            const user = await this.userRepository.getByEmail(email);

            // step:2 -> compare the incoming plain password with stored encrypted password
            const passwordMatch = this.checkPassword(plainPassword, user.password);
            if(!passwordMatch) {
                console.log("Oops! wrong password");
                throw {error: 'incorrect password'};
            }
            // step:3 -> if password matches,
            // create a new jwtToken and send it to the client side
            const newJwt = this.createToken({email: user.email, id: user.id});
            return newJwt;
        } catch (error) {
            console.log("Something went wrong in Sign-in process");
            throw error;
        }
    }

    async isAuthenticated(token) {
        try {
            const response = this.verifyToken(token);
            if(!response) {
                throw {error: "Invalid takone"};
            }
            const user = await this.userRepository.getById(response.id);
            if(!user) {
                throw {error: "no user is found with the corresponding token"};
            }
            return user.id;
        } catch (error) {
            console.log("Something went wrong in Sign-in process");
            throw error;
        }
    }

    createToken(user) {
        try {
            const result = jwt.sign(user, JWT_KEY, {expiresIn: '1d'});
            return result;
        } catch (error) {
            console.log("Something went wrong in token creation!");
            throw(error);
        }
    }

    verifyToken(token) {
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;
        } catch (error) {
            console.log("Something went wrong in token validation!");
            console.log(error);
            throw error;
        }
    }

    checkPassword(userPlainPassword, encryptedPassword) {
        try {
            return bcrypt.compareSync(userPlainPassword, encryptedPassword);
        } catch (error) {
            console.log("Something went wrong with password comparison!");
            throw error;
        }
    }
}


module.exports = UserService;