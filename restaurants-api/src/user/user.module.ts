import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './service/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../database/schemas/user/user.schema';
import { UserRepository } from '../database/repository/user.repository';
import { RestaurantRepository } from '../database/repository/restaurant.repository';
import { Restaurant, RestaurantSchema } from '../database/schemas/restaurant/restaurant.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Restaurant.name, schema: RestaurantSchema }])
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, RestaurantRepository]
})
export class UserModule {}
