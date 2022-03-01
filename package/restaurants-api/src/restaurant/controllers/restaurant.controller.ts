import {Controller, Get, HttpCode, Query} from '@nestjs/common';
import { RestaurantService } from '../service/restaurant.service';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { PaginationValidationPipe } from '../../common/pipes/pagination-validation';
import { RestauranteDetailResponse } from '../interface/restaurante-detail-response';

@Controller('restaurant')
export class RestaurantController {

    constructor(private readonly restaurantService: RestaurantService) {
    }

    @Get('/')
    @HttpCode(200)
    async getRestaurants(
        @Query(new PaginationValidationPipe()) pagination: PaginationDto,
        @Query('category') category?: string,
    ): Promise<RestauranteDetailResponse> {
        return this.restaurantService.getRestaurants(pagination, category);
    }

}
