import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { user, userSchema } from '../schemas/userModel';

@Module({
  imports:[MongooseModule.forFeature([
    {name:'user',schema:userSchema}
  ])],
  controllers:[UserController],
  providers:[UserService],
})
export class UserModule {}
