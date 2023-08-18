import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../dto/userDto';
import { loginFormDto } from '../dto/loginFormDto';
import { userIdDto } from '../dto/userId';
import { freelancerApplyDto } from '../dto/freelancerDto'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('signup')
  registerUser(@Body() registerForm: CreateUserDto) {
    return this.userService.registerUser(registerForm)
  }

  @Post('login')
  loginUser(@Body() loginForm: loginFormDto) {
    return this.userService.loginUser(loginForm)
  }

  @Get('getUser/:id')
  getUser(@Param('id') phoneNumber: any) {

    return this.userService.getUser(phoneNumber)
  }

  @Get('getUserUsingId/:id')
  getUserUsingId(@Param('id') userId: any) {
    return this.userService.getUserUsingId(userId)
  }

  @Get('loadCategoriesAndSubCategories')
  loadCategoriesAndSubCategories() {
    return this.userService.loadCategoriesAndSubCategories()
  }

  @Post('freelancerApply')
  freelancerApply(@Body() freelancerApplyForm: freelancerApplyDto) {
    return this.userService.freelancerApply(freelancerApplyForm)
  }

  @Post('addGig')
  addGig(@Body() gigData: CreateUserDto) {
    return this.userService.addGig(gigData)
  }

  @Get('getAllGigs/:id')
  getAllGigs(@Param('id') id:string) {
    return this.userService.getAllGigs(id)
  }

  @Get('getAllCategories')
  getAllCategories() {
    return this.userService.getAllCategories()
  }


  @Get('getSubcategoriesofCategory/:categoryId')
  getSubcategoriesOfCategory(@Param('categoryId') categoryId:string) {
    return this.userService.getSubcategoriesOfCategory(categoryId)
  }


  @Get('getGigs')
  getGigs() {
    return this.userService.getGigs()
  }
  
}


