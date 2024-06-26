import { Body, Controller, Get, HttpCode, Param, Patch } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { RestaurantDto } from '../dto/restaurant.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('user')
@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {
    }

    @Get('/:userId/restaurant/likes')
    @HttpCode(200)
    async getRestaurant(@Param('userId') userId: string) {
        return await this.userService.findRestaurant(userId);
    }

    @Patch('/:userId/restaurant/likes')
    @HttpCode(200)
    async addRestaurant(@Param('userId') userId: string, @Body() restaurant: RestaurantDto) {
        return await this.userService.updateFavoriteRestaurant(userId, restaurant);
    }

}
