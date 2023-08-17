import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthMiddleware } from './helper/middleware/auth.middleware';
 
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/Skill_Mingle'),
    UserModule,
    AdminModule,
    JwtModule.register({
      global:true,
      secret:"jwtSecret",
      signOptions:{expiresIn:'15s'},
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
      )
      .forRoutes('*');
  }
}
