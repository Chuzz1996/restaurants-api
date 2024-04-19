import { Injectable } from '@nestjs/common';
import { RestaurantRepository } from '../../database/repository/restaurant.repository';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { RestaurantDetailInterface } from '../../database/interface/restaurant/restaurant-detail.interface';
import { RestaurantDetailResponseI } from '../interface/restaurant-detail-response.interface';
import { NotFoundException } from '../../exceptions/not-found.exception';
import { RestaurantInterface } from '../../database/interface/restaurant/restaurant.interface';
import { CommentDto } from '../dto/comment.dto';
import { UserRequiredException } from '../../exceptions/user-required.exception';
import { NotModifiedException } from '../../exceptions/not-modified.exception';
import { UserRepository } from '../../database/repository/user.repository';
import { CreateRestaurantDto } from "../dto/add-restaurant.dto";

@Injectable()
export class RestaurantService {

    constructor(private readonly restaurantRepository: RestaurantRepository,
        private readonly userRepository: UserRepository,) {
    }

    async addRestaurant(restaurant: CreateRestaurantDto): Promise<void> {
        await this.restaurantRepository.addRestaurant(restaurant);
    }

    async getRestaurants(pagination: PaginationDto, category?: string[]): Promise<RestaurantDetailResponseI> {
        const restaurantData: RestaurantDetailInterface[] = await this.restaurantRepository.findRestaurant(pagination, category);
        if (restaurantData.length === 0) {
            throw new NotFoundException('restaurants not found');
        }
        return {
            skip: pagination.skip,
            limit: pagination.limit,
            data: restaurantData,
        };
    }

    async getRestaurantDetail(restaurantId: string): Promise<RestaurantInterface> {
        const restaurantData = await this.restaurantRepository.findRestaurantById(restaurantId);
        if (!restaurantData) {
            throw new NotFoundException('restaurants not found');
        }
        return restaurantData;
    }

    async addCommentToRestaurant(restaurantId: string, comment: CommentDto): Promise<void> {
        if (!comment.user) {
            throw new UserRequiredException('User has to be login');
        }
        let userId;
        try {
            userId = await this.userRepository.findUserById(comment.user);
        } catch (e) {
            console.log(e.message);
        }
        if (!userId) {
            throw new UserRequiredException('User has to be login');
        }
        if (comment.action === 'add') {
            await this.restaurantRepository.addComment(restaurantId, comment);
        } else if (comment.commentId && (comment.action === 'like' || comment.action === 'unlike')) {
            if (comment.action === 'like') {
                await this.restaurantRepository.updateCommentStatus(restaurantId, comment.commentId, 1);
            } else if (comment.action === 'unlike') {
                await this.restaurantRepository.updateCommentStatus(restaurantId, comment.commentId, -1);
            }
        } else {
            throw new NotModifiedException('Comment cant be added');
        }
    }
}
