import { Controller, Body, Get, Param, Post, Patch, Delete, Query } from '@nestjs/common';
import { AdminService } from './admin.service';
import { loginFormDto } from '../dto/loginFormDto';
import { categoryDto } from '../dto/categoryDto';
import { subcategoryDto } from '../dto/subCategoryDto';
import { editCategoryDto } from '../dto/editCategory';
import { userIdDto } from '../dto/userId';
import { freelancer } from 'src/schemas/freelancerModel';

@Controller('admin')
export class AdminController {

    constructor(private readonly adminService: AdminService) { }

    @Post('verifyLogin')
    loginUser(@Body() loginForm: loginFormDto) {

        return this.adminService.verifyLogin(loginForm)
    }

    @Post('addCategory')
    addCategory(@Body() categoryData: categoryDto) {
        return this.adminService.addCategory(categoryData)
    }

    @Get('loadCategoriesAndSubCategories')
    loadCategoriesAndSubCategories() {
        return this.adminService.loadCategoriesAndSubCategories()
    }

    @Post('addSubcategory')
    addSubcategory(@Body() subcategoryData: subcategoryDto) {
        return this.adminService.addSubcategory(subcategoryData)
    }

    @Patch('editCategory')
    editCategory(@Body() categoryData: editCategoryDto) {
        console.log(categoryData)
        return this.adminService.editCategory(categoryData)
    }

    @Delete('deleteCategory')
    deleteCategory(@Query('id') id: string) {
        console.log(id)
        return this.adminService.deleteCategory(id)
    }

    @Get('getAllUsers')
    getAllUser() {
        return this.adminService.getAllUsers()
    }

    @Patch('blockUser')
    blockUser(@Body() userId: userIdDto) {
        console.log(userId)
        return this.adminService.blockUser(userId)
    }

    @Patch('unblockUser')
    unblockUser(@Body() userId: userIdDto) {
        console.log(userId)
        return this.adminService.unblockUser(userId)
    }

    @Get('getAllFreelancers')
    getAllFreelancers() {
        return this.adminService.getAllFreelancers()
    }

    @Patch('freelancerApprove')
    freelancerApprove(@Body() id: Object) {

        return this.adminService.freelanceApprove(id)
    }

    @Patch('freelancerReject')
    freelancerReject(@Body() id: Object) {

        return this.adminService.freelanceReject(id)
    }

    
    @Get('getSubcategory/:id')
    getSubcategory(@Param('id') id:string) {
        console.log(id)
        return this.adminService.getSubcategoryUsingId(id)
    }
    

    @Get('deleteSubcategory/:id')
    deleteSubcategory(@Param('id') id:string) {
        console.log(id)
        return this.adminService.deleteSubcategoryUsingId(id)
    }

    @Patch('editSubcategory')
    editSubcategory(@Body() subcategoryData:Object){
        return this.adminService.editSubcategory(subcategoryData)
    }
    

    @Get('getAllGigs')
    getAllGigs() { 
        return this.adminService.getAllGigs()
    }
    
    
  

}
