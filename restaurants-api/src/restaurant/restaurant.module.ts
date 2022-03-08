import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Restaurant, RestaurantSchema } from '../database/schemas/restaurant/restaurant.schema';
import { RestaurantController } from './controllers/restaurant.controller';
import { RestaurantService } from './service/restaurant.service';
import { RestaurantRepository } from '../database/repository/restaurant.repository';
import { User, UserSchema } from '../database/schemas/user/user.schema';
import { UserRepository } from '../database/repository/user.repository';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Restaurant.name, schema: RestaurantSchema }]),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
    controllers: [RestaurantController],
    providers: [RestaurantService, RestaurantRepository, UserRepository],
})
export class RestaurantModule { }
