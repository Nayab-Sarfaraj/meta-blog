const userRepository = require("../repository/user.repository");
const ErrorHandler = require("../utils/errorhandler");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

class UserService {

    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async createUser(data){
        const user = await this.userRepository.findByEmail(data.email)
        if (user) throw new ErrorHandler("User already exist", 401);

        const savedUser = await this.userRepository.create(data);
        return savedUser;
    }

    async loginUser(data){
    
       const user = await this.userRepository.findByEmail(data.email);
       console.log(user)
           if (!user) return new ErrorHandler("Invalid email or password", 401)
       
           const isMatching = await bcrypt.compare(data.password, user.password);
           console.log(isMatching)

           if (!isMatching)
              throw new ErrorHandler("Invalid email or password", 401); 

            const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
                expiresIn: "1w",
            });
        
           return {user,token}
    }

}

module.exports = new UserService(userRepository);