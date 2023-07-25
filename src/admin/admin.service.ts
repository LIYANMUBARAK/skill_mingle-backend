import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { admin } from '../schemas/adminModel';

const bcrypt = require('bcrypt')

@Injectable()
export class AdminService {


    constructor(  @InjectModel('admin') private readonly adminModel: Model<admin>,
    private jwtService:JwtService,){}

    async verifyLogin(loginForm){
        
        const {email,password}=loginForm
        const admin=await this.adminModel.findOne({email})
        if(admin){
        const passwordMatch=await bcrypt.compare(password,admin.password)
        if(passwordMatch){
            const payload = {sub:admin._id,email:email}
            const token =  await this.jwtService.signAsync(payload)
            return {token:token,id:admin._id,adminData:admin}
        }
        else{
            return {passwordError:"Password is incorrect"}
        }
    }
    else{
        return {emailError:"Email is incorrect"}
    }
    }

}
