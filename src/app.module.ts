import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { JwtModule } from '@nestjs/jwt';
 
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/Skill_Mingle'),
    UserModule,
    AdminModule,
    JwtModule.register({
      global:true,
      secret:"jwtSecret",
      signOptions:{expiresIn:'1d'},
    })
  ],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
