import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../dto/userDto';
import { loginFormDto } from '../dto/loginFormDto';
import { userIdDto } from '../dto/userId';
import { workDto } from '../dto/workDto';
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
  

  @Delete('deleteGig')
  deleteGig(@Query('id') id: string) {
      console.log(id)
      return this.userService.deleteGig(id)
  }

  @Get('getGig/:id')
  getGig(@Param('id') id:string){
    console.log(id)
    return this.userService.getGig(id)
  }


  @Get('emailExist/:email')
  emailExist(@Param('email') email:string){
    console.log(email)
    return this.userService.emailExist(email)
  }

  @Patch('editUser')
  freelancerReject(@Body() formData: Object) {
    
      return this.userService.editUser(formData)
  }

  @Get('sendPasswordResetEmail/:email')
  sendPasswordResetEmail(@Param('email') email:string){
    console.log(email)
    return this.userService.sendPasswordResetEmail(email)
  }

  @Post('chatConnect')
  chatConnect(@Body() ids:Object){
   return this.userService.chatConnect(ids)
  }

  @Post('getChatforUser')
  getChatforUser(@Body() freelancerAndUserId:Object){
   return this.userService.getChatforUser(freelancerAndUserId)
  }


  @Post('chatSend')
  chatSend(@Body() chat:Object){
    console.log(chat)
   return this.userService.chatSend(chat)
  }


  @Get('getConnections/:userId')
  getConnections(@Param('userId') userId:string){
    console.log(userId)
    return this.userService.getConnections(userId)
  }

  @Get('getConnectionsForFreelancer/:freelancerId')
  getConnectionsForFreelancer(@Param('freelancerId') freelancerId:string){
      console.log(freelancerId)
      return this.userService.getConnectionsForFreelancer(freelancerId)
    }

    @Get('getGigOfCategory/:categoryName')
    
    getGigOfCategory(@Param('categoryName') categoryName:string){
        console.log(categoryName)
        return this.userService.getGigOfCategory(categoryName)
      }


      @Post('orderSave')
      orderSave(@Body() orderData:Object){
        console.log(orderData)
       return this.userService.orderSave(orderData)
      }

      @Get('getSubcategories/:categoryName')
    
      getSubcategories(@Param('categoryName') categoryName:string){
        
        return this.userService.getSubcategories(categoryName)
      }

      @Get('getAllOrdersForUser/:userId')
      getAllOrdersForUser(@Param('userId') userId:string){
        
        return this.userService.getAllOrdersForUser(userId)
      }

      @Get('getAllOrdersForFreelancer/:freelancerId')
      getAllOrdersForFreelancer(@Param('freelancerId') freelancerId:string){
        
        return this.userService.getAllOrdersForFreelancer(freelancerId)
      }

      @Get('getOrderById/:orderId')
      getOrderById(@Param('orderId') orderId:string){
        
        return this.userService.getOrderById(orderId)
      }


  @Post('sendWork')
  sendWork(@Body() workDetails:workDto ) {
    return this.userService.sendWork(workDetails)
  }
   

  @Post('sendRevision')
  sendRevision(@Body() reviseDetails:object ) {
    return this.userService.sendRevision(reviseDetails)
  }

  @Post('completeOrder')
  completeOrder(@Body() orderId:object ) {
    return this.userService.completeOrder(orderId)
  }
   
        @Post('addReview')
  addReview(@Body() reviewDetails:object ) {
    return this.userService.addReview(reviewDetails)
  }

  @Post('changePassword')
  changePassword(@Body() passwords:object ) {
    return this.userService.changePassword(passwords)
  }

  @Get('getFreelancerById/:freelancerId')
  getFreelancerById(@Param('freelancerId') freelancerId:string){
    console.log(freelancerId)
    return this.userService.getFreelancerById(freelancerId)
  }

  @Get('getPendingOrdersForFreelancer/:userId')
  getPendingOrdersForFreelancer(@Param('userId') userId:string){
   
    return this.userService.getPendingOrdersForFreelancer(userId)
  }

 
}


