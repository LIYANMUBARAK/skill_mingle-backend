import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/dto/userDto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService){} 

  @Post('register')
  registerUser(@Body() registerForm:CreateUserDto){
    this.userService.registerUser(registerForm)
  }

}


