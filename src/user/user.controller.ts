import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../dto/userDto';
import { loginFormDto } from '../dto/loginFormDto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService){} 

  @Post('signup')
  registerUser(@Body() registerForm:CreateUserDto){
    return this.userService.registerUser(registerForm)
    }
    
  @Post('login')
  loginUser(@Body() loginForm:loginFormDto){
    return this.userService.loginUser(loginForm)
  }

  @Get('getUser/:id')
  getUser(@Param('id') phoneNumber:any){
    console.log(phoneNumber.phoneNumber)
    return this.userService.getUser(phoneNumber)
  }
}


