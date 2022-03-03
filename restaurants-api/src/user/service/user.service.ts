import { Injectable } from '@nestjs/common';
import { RestaurantRepository } from '../../database/repository/restaurant.repository';
import { UserRepository } from '../../database/repository/user.repository';
import {NotFoundException} from "../../exceptions/not-found.exception";
import {RestaurantDto} from "../dto/restaurant.dto";

@Injectable()
export class UserService {

    constructor(private readonly userRepository: UserRepository,
                private readonly restaurantRepository: RestaurantRepository) {
    }

    async findRestaurant(userId: string){
        const { restaurant } = await this.userRepository.getRestaurants(userId);
        if(restaurant.length === 0){
            throw new NotFoundException('restaurants not found');
        }
        const result = await this.restaurantRepository.findRestaurantDetailsById(restaurant);
        if(!result){
            throw new NotFoundException('restaurants not found');
        }
        return result;
    }

    async addRestaurant(userId: string, restaurant: RestaurantDto){
        const { restaurantId } = restaurant;
        await this.userRepository.addRestaurant(userId,restaurantId);
    }
}
