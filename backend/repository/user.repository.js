const User = require("../model/userModel")


class UserRepository{
    constructor(userModel){
        this.userModel=userModel
    }
    async create(data){
        const newuser = new this.userModel({
            email:data.email,
            password:data.password,
            name:data.name,
            avatar: "https://shorturl.at/nOEI9",
        });
        const saveduser = await newuser.save();
        return saveduser;
    }
    async findByEmail(email){
        const user = await this.userModel.findOne({email})
        return user
    }
}
module.exports = new UserRepository(User)