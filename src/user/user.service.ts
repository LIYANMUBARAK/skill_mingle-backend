import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dto/userDto';
import { loginFormDto } from 'src/dto/loginFormDto';
import { user } from 'src/schemas/userModel';
import { JwtService } from '@nestjs/jwt';

const bcrypt = require('bcrypt')

@Injectable()
export class UserService {

    constructor(
        @InjectModel('user') private readonly userModel: Model<user>,
        private jwtService:JwtService,
    ) { }

    async registerUser(registerForm: CreateUserDto): Promise<any> {
        try {
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
                        const user = new this.userModel({
                            name: name,
                            userName: userName,
                            email: email,
                            password: hashPassword,
                            mobileNumber: mobileNumber,
                            gender: gender,
                            country: country,
                            city: city
                        })
                        await user.save();
                        return { userSave: true }
                    }
                }
            }

        } catch (error) {
            console.log(error.message)
        }

    }

   async loginUser(loginForm:loginFormDto){
        try {
            const {email,password}=loginForm
            const user= await this.userModel.findOne({email})
            if(user)
            {
                

                const hashPassword = await bcrypt.hash(password,10)
                const passwordCheck = await bcrypt.compare(password,user.password)
                
                if(passwordCheck){
                    const payload = {sub:user._id,email:email}
                    const token = await this.jwtService.signAsync(payload)
                    return { token:token,id:user._id,userData:user }
                } 
                else{
                    return { passwordError:"Password is Incorrect" }
                }
            }
            else{
                return { emailError:"Email not found" }
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    async getUser(phoneNumber:any){
        try {
            console.log(phoneNumber)
           const number=parseInt(phoneNumber)
           const phoneNumberWithCountryCode=`91${number}`
           console.log(phoneNumberWithCountryCode)
           const userExist=await this.userModel.findOne({mobileNumber:phoneNumberWithCountryCode})
           console.log(userExist)
           if(userExist){
            const payload = {sub:userExist._id,email:userExist.email}
                    const token = await this.jwtService.signAsync(payload)
            return { token:token,user:userExist,id:userExist._id }
           }
           else{
            return {userExistError:"User not found"}
           }
        } catch (error) {
            console.log(error.message)
        }
    }
}