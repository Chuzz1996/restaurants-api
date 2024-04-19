import {Body, Controller, Get, HttpCode, Param, Patch, Post, Query} from '@nestjs/common';
import { RestaurantService } from '../service/restaurant.service';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { PaginationValidationPipe } from '../../common/pipes/pagination-validation.pipe';
import { RestaurantDetailResponseI } from '../interface/restaurant-detail-response.interface';
import { RestaurantInterface } from '../../database/interface/restaurant/restaurant.interface';
import { CommentDto } from '../dto/comment.dto';
import { RestaurantFilterPipe } from '../pipes/restaurant-filter.pipe';
import { ApiTags } from '@nestjs/swagger';
import {CreateRestaurantDto} from "../dto/add-restaurant.dto";


@ApiTags('restaurant')
@Controller('restaurant')
export class RestaurantController {

    constructor(private readonly restaurantService: RestaurantService) {
    }

    @Get('/')
    @HttpCode(200)
    async getRestaurants(
        @Query(new PaginationValidationPipe()) pagination: PaginationDto,
        @Query(new RestaurantFilterPipe()) category?: string[],
    ): Promise<RestaurantDetailResponseI> {
        return this.restaurantService.getRestaurants(pagination, category);
    }

    @Post()
    @HttpCode(201)
    async addRestaurant(@Body() restaurant: CreateRestaurantDto) {
        return this.restaurantService.addRestaurant(restaurant);
    }

    @Get('/:restaurantId')
    @HttpCode(200)
    async getDataRestaurant(@Param('restaurantId') restaurantId: string): Promise<RestaurantInterface> {
        return this.restaurantService.getRestaurantDetail(restaurantId);
    }

    @Patch('/:restaurantId/comment')
    @HttpCode(200)
    async addComment(@Param('restaurantId') restaurantId: string,
        @Body() comment: CommentDto): Promise<void> {
        await this.restaurantService.addCommentToRestaurant(restaurantId, comment);
    }
}
