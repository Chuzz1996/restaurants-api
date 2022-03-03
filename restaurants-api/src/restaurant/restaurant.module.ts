import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Restaurant, RestaurantSchema } from '../database/schemas/restaurant/restaurant.schema';
import { RestaurantController } from './controllers/restaurant.controller';
import { RestaurantService } from './service/restaurant.service';
import { RestaurantRepository } from '../database/repository/restaurant.repository';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Restaurant.name, schema: RestaurantSchema }])
    ],
    controllers: [RestaurantController],
    providers: [RestaurantService, RestaurantRepository],
})
export class RestaurantModule { }
