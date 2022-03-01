import { RestaurantDetailInterface } from '../../database/interface/restaurant/restaurant-detail.interface';

export interface RestauranteDetailResponse{
    skip: number;
    limit: number;
    data: RestaurantDetailInterface;
}