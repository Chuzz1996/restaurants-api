import { Injectable } from '@nestjs/common';
import {RestaurantRepository} from '../../database/repository/restaurant.repository';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { RestaurantDetailInterface } from '../../database/interface/restaurant/restaurant-detail.interface';
import { RestauranteDetailResponse } from '../interface/restaurante-detail-response';

@Injectable()
export class RestaurantService {

    constructor(private readonly restaurantRepository: RestaurantRepository) {
    }

    async getRestaurants(pagination: PaginationDto, category?: string): Promise<RestauranteDetailResponse>{
        const restaurantData: RestaurantDetailInterface =  await this.restaurantRepository.findRestaurant(pagination,category);
        return {
            skip: pagination.skip,
            limit: pagination.limit,
            data: restaurantData,
        }
    }
}
