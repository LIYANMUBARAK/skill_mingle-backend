import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { admin } from '../schemas/adminModel';
import { category } from '../schemas/categoryModel';
import { categoryDto } from '../dto/categoryDto';
import { subcategory } from '../schemas/subcategoryModel';
import { user } from 'src/schemas/userModel';

const bcrypt = require('bcrypt')

@Injectable()
export class AdminService {


    constructor(  @InjectModel('admin') private readonly adminModel: Model<admin>,
    private jwtService:JwtService,@InjectModel('category') private readonly categoryModel: Model<category>,
    @InjectModel('subcategory') private readonly subcategoryModel: Model<subcategory>,
    @InjectModel('user') private readonly userModel:Model<user>){}

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


    async editCategory(categoryData){
        try {
            const { newCategoryName,id }=categoryData

            const categoryExist = await this.categoryModel.findOne({name:newCategoryName})
            if(categoryExist)
            {
                return {categoryExistError:"Category already exists"}
            }
            else{
                const categoryId = new Types.ObjectId(id)
                await this.categoryModel.findOneAndUpdate({_id:categoryId},{name:newCategoryName})
                return { cateogrySave: true }
            }
        } catch (error) {
            console.log(error.message)
        }
        
        }


    async loadCategoriesAndSubCategories(){
        try {
            const categories = await this.categoryModel.find({})
            const subcategories = await this.subcategoryModel.find({})
            return {categories:categories,subcategories:subcategories}
        } catch (error) {
            console.log(error.message)
        }
    }

    async addSubcategory(subcategoryData){
        try {
            const subcategoryName=subcategoryData.subcategoryName
         
            const categoryId = new Types.ObjectId(subcategoryData.categoryId)
       
            const subcategory=new this.subcategoryModel({
                name: subcategoryName,
                categoryId:categoryId
            })
            await subcategory.save()
            return {subcategorySave:true}
        } catch (error) {
            console.log(error.message)
        }
    }

    async deleteCategory(id){
        try {
            
            const categoryId = new Types.ObjectId(id)
    
             await this.categoryModel.deleteOne({_id:categoryId})
             return true
            
        } catch (error) {
            console.log(error.message)
        }
        
        }

        async getAllUsers(){
            try{
                const allUsers = await this.userModel.find({})
                return {users:allUsers} 
            }catch(error){
                console.log(error.message)
            }
        }

        async blockUser(userData){
          try {
            const id=userData.userId
            const userId = new Types.ObjectId(id)
            await this.userModel.findOneAndUpdate({_id:userId},{isBlocked:true})
            return true
          } catch (error) {
            console.log(error.message)
          }  
        }

        async unblockUser(userData){
            try {
              const id=userData.userId
              const userId = new Types.ObjectId(id)
              await this.userModel.findOneAndUpdate({_id:userId},{isBlocked:false})
              return true
            } catch (error) {
              console.log(error.message)
            }  
          }
}
