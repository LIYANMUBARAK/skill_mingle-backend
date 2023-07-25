import { Controller,Body, Get, Param, Post  } from '@nestjs/common';
import { AdminService } from './admin.service';
import { loginFormDto } from '../dto/loginFormDto';

@Controller('admin')
export class AdminController {

    constructor(private adminService:AdminService){}

    @Post('login')
    loginUser(@Body() loginForm:loginFormDto){
        console.log(loginForm)
     return this.adminService.verifyLogin(loginForm)  
    }
}
