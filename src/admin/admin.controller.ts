import { Controller,Body, Get, Param, Post  } from '@nestjs/common';
import { AdminService } from './admin.service';
import { loginFormDto } from '../dto/loginFormDto';
import { categoryDto } from '../dto/categoryDto';
import { subcategoryDto } from '../dto/subCategoryDto';

@Controller('admin')
export class AdminController {

    constructor(private readonly adminService:AdminService){}

    @Post('verifyLogin')
    loginUser(@Body() loginForm:loginFormDto){
       
     return this.adminService.verifyLogin(loginForm)  
    }

    @Post('addCategory')
    addCategory(@Body() categoryData:categoryDto){
        return this.adminService.addCategory(categoryData)
    }

    @Get('loadCategoriesAndSubCategories')
    loadCategoriesAndSubCategories(){
        return this.adminService.loadCategoriesAndSubCategories()
    }

    @Post('addSubcategory')
    addSubcategory(@Body() subcategoryData:subcategoryDto){
    return this.adminService.addSubcategory(subcategoryData)
}
}
