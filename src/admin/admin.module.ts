import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { MongooseModule } from '@nestjs/mongoose';
import { adminSchema } from '../schemas/adminModel';


@Module({
  imports:[MongooseModule.forFeature([
    {name:'admin',schema:adminSchema}
  ])],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
