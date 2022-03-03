import { RestaurantDetailInterface } from '../../database/interface/restaurant/restaurant-detail.interface';

export interface RestaurantDetailResponseI{
    skip: number;
    limit: number;
    data: RestaurantDetailInterface[];
}