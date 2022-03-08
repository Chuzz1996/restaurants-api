import { Injectable } from '@nestjs/common';
import { RestaurantRepository } from '../../database/repository/restaurant.repository';
import { UserRepository } from '../../database/repository/user.repository';
import { NotFoundException } from '../../exceptions/not-found.exception';
import { RestaurantDto } from '../dto/restaurant.dto';
import { NotModifiedException } from '../../exceptions/not-modified.exception';

@Injectable()
export class UserService {

    constructor(private readonly userRepository: UserRepository,
        private readonly restaurantRepository: RestaurantRepository) {
    }

    async findRestaurant(userId: string) {
        const { restaurant } = await this.userRepository.getRestaurants(userId);
        if (restaurant.length === 0) {
            throw new NotFoundException('restaurants not found');
        }
        const result = await this.restaurantRepository.findRestaurantDetailsById(restaurant);
        if (!result) {
            throw new NotFoundException('restaurants not found');
        }
        return result;
    }

    async updateFavoriteRestaurant(userId: string, restaurant: RestaurantDto) {
        const { restaurantId, action } = restaurant;
        let userChange = 0;
        if (action === 'add') {
            const existsRestaurant = await this.userRepository.existsRestaurant(userId, restaurantId);
            if (existsRestaurant) {
                throw new NotModifiedException('No change in user restaurants');
            }
            userChange = await this.userRepository.addRestaurant(userId, restaurantId);
        } else if (action === 'remove') {
            userChange = await this.userRepository.removeRestaurante(userId, restaurantId);
        }
        if (userChange === 0) {
            throw new NotModifiedException('No change in user restaurants');
        }
    }
}
