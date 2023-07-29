import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { user, userSchema } from '../schemas/userModel';
import { category, categorySchema } from '../schemas/categoryModel';
import { subcategorySchema } from '../schemas/subcategoryModel';

@Module({
  imports:[MongooseModule.forFeature([
    {name:'user',schema:userSchema},
    {name:'category',schema:categorySchema},
    {name:'subcategory',schema:subcategorySchema}
  ])],
  controllers:[UserController],
  providers:[UserService],
})
export class UserModule {}
