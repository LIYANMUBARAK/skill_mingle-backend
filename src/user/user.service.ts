import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dto/userDto';
import { user } from 'src/schemas/userModel';

const bcrypt = require('bcrypt')

@Injectable()
export class UserService {

    constructor(
        @InjectModel('user') private readonly userModel: Model<user>
    ) { }

    async registerUser(registerForm: CreateUserDto): Promise<any> {
        const { name, userName, email, password, mobileNumber, gender, country, city } = registerForm
        const hashPassword = await bcrypt.hash(password, 10)
        const emailExist = await this.userModel.findOne({ email })
        const userNameExist = await this.userModel.findOne({ userName })
        const mobileNumberExist = await this.userModel.findOne({ mobileNumber })
        if (emailExist) {
            return { emailMatch: "Email is already used" }
        }
        else {

            if (mobileNumberExist) {
                return { mobileNumberMatch: "User Name is already taken" }
            }
            else {
                if (userNameExist) {
                    return { userNameExist: "User Name is already used" }
                }
                else {
                    
                }
            }
        }
    }
}