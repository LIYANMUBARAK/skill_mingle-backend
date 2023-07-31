import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { MongooseModule } from '@nestjs/mongoose';
import { adminSchema } from '../schemas/adminModel';
import { categorySchema } from '../schemas/categoryModel';
import { subcategorySchema } from '../schemas/subcategoryModel';
import { userSchema } from '../schemas/userModel';

@Module({
  imports:[MongooseModule.forFeature([
    {name:'admin',schema:adminSchema},
    {
      name:'category',schema:categorySchema
    },
    {
      name:'subcategory',schema:subcategorySchema
    },
    {
      name:'user',schema:userSchema
    }
  ])],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
