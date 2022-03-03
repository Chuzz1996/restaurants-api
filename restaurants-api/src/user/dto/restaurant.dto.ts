import { IsDefined, IsString } from 'class-validator';

export class RestaurantDto{
    @IsDefined()
    @IsString()
    restaurantId: string;
}