import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantModule } from './restaurant/restaurant.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
      MongooseModule.forRoot('mongodb://localhost:27017/bogotaeats-restaurants'),
      CategoryModule,
      RestaurantModule,
      UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
