import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { admin } from '../schemas/adminModel';
import { category } from '../schemas/categoryModel';
import { categoryDto } from '../dto/categoryDto';

const bcrypt = require('bcrypt')

@Injectable()
export class AdminService {


    constructor(  @InjectModel('admin') private readonly adminModel: Model<admin>,
    private jwtService:JwtService,@InjectModel('category') private readonly categoryModel: Model<category>){}

    async verifyLogin(loginForm){
      try {
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
    
      } catch (error) {
        console.log(error.message)
      }  
        
    }

    async addCategory(categoryData){
    try {
        const { categoryName }=categoryData
        const categoryExist = await this.categoryModel.findOne({name:categoryName})
        if(categoryExist)
        {
            return {categoryExistError:"Cateory already exists"}
        }
        else{
            const category = new this.categoryModel({
                name: categoryName,
             })
            await category.save();
            return { cateogrySave: true }
        }
    } catch (error) {
        console.log(error.message)
    }
    
    }

}
