import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Restaurant, RestaurantDocument } from '../schemas/restaurant/restaurant.schema';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { RestaurantDetailInterface } from '../interface/restaurant/restaurant-detail.interface';

@Injectable()
export class RestaurantRepository{

    constructor(@InjectModel(Restaurant.name)
                private readonly restaurantModel: Model<RestaurantDocument>) {
    }

    async findRestaurant(pagination: PaginationDto, category?: string): Promise<RestaurantDetailInterface>{
        const aggregate = [];
        if(category){
            aggregate.push({
                $match: {
                    $in: [category]
                }
            })
        }
        aggregate.push({
            '$project': {
                'name': 1,
                'direction': 1,
                'price': 1,
                'picture': {
                    '$first': '$pictures'
                }
            }
        })
        return this.restaurantModel.aggregate(aggregate).skip(pagination.skip).limit(pagination.limit) as RestaurantDetailInterface;
    }

}