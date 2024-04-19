import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantModule } from './restaurant/restaurant.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import credentials from "./configuration/credentials";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [credentials],
      isGlobal:true,
    }),
    MongooseModule.forRoot(credentials().MONGO_DB_URL),
    CategoryModule,
    RestaurantModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
