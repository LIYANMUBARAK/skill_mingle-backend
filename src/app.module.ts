import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthMiddleware } from './helper/middleware/auth.middleware';
import { MailerModule } from '@nestjs-modules/mailer';
import * as dotenv from 'dotenv'
 dotenv.config()
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/Skill_Mingle'),
    UserModule,
    AdminModule,
    JwtModule.register({
      global:true,
      secret:"jwtSecret",
      signOptions:{expiresIn:'1d'},
    }),
    MailerModule.forRoot({
      transport:{
        host:'smtp.gmail.com',
        port:465,
        secure:true,
        auth:{
          user:process.env.USER,
          pass:process.env.PASS
        }

      }
    })
  ],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'user/login', method: RequestMethod.POST },
        { path: 'user/signup', method: RequestMethod.POST },
        {path:'/user/loadCategoriesAndSubcategories',method:RequestMethod.GET},
        {path:'/user/getUser/:id',method:RequestMethod.GET},
        { path: 'admin/login', method: RequestMethod.POST },
        { path: 'admin/verifyLogin', method: RequestMethod.POST },
        {path:'user/emailExist/:email',method:RequestMethod.GET},
        {path:'user/sendPasswordResetEmail/:email',method:RequestMethod.GET}
      )
      .forRoutes('*');
  }
}
