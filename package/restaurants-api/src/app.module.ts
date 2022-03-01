import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantModule } from './restaurant/restaurant.module';

@Module({
  imports: [
      MongooseModule.forRoot('mongodb://localhost:27017/bogotaeats-restaurants'),
      CategoryModule,
      RestaurantModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
