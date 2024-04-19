import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Restaurant, RestaurantDocument } from '../schemas/restaurant/restaurant.schema';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { RestaurantDetailInterface } from '../interface/restaurant/restaurant-detail.interface';
import { RestaurantInterface } from '../interface/restaurant/restaurant.interface';
import { CommentDto } from '../../restaurant/dto/comment.dto';
import { v4 as uuid } from 'uuid';
import {CreateRestaurantDto} from "../../restaurant/dto/add-restaurant.dto";

@Injectable()
export class RestaurantRepository {

    constructor(@InjectModel(Restaurant.name)
    private readonly restaurantModel: Model<RestaurantDocument>) {
    }

    async findRestaurant(pagination: PaginationDto, category?: string[]): Promise<RestaurantDetailInterface[]> {
        const aggregate = [];
        if (category) {
            category.map(i => aggregate.push({
                $match: {
                    categories: { $in: [i] }
                }
            }));
        }
        aggregate.push(await this.projectDetail());
        return await this.restaurantModel.aggregate(aggregate).skip(pagination.skip).limit(pagination.limit).exec() as RestaurantDetailInterface[];
    }

    async findRestaurantById(restaurantId: string): Promise<RestaurantInterface> {
        return await this.restaurantModel.findOne({
            _id: restaurantId
        }).exec() as RestaurantInterface;
    }

    async addComment(restaurantId: string, comment: CommentDto): Promise<void> {
        const currentDate = new Date();
        const commentId = uuid();
        await this.restaurantModel.updateOne({
            _id: restaurantId
        }, {
            $push: {
                comments: {
                    user: comment.user,
                    comment: comment.comment,
                    date: currentDate.toISOString().substring(0, 10),
                    commentId: commentId,
                    userQualification: 0
                }
            }
        }).exec();
    }

    async updateCommentStatus(restaurantId: string, commentId: string, qualification: number): Promise<void> {
        await this.restaurantModel.updateOne({
            _id: restaurantId,
            'comments.commentId': commentId
        },
            {
                $inc: {
                    'comments.$.userQualification': qualification
                }
            });
    }

    async findRestaurantDetailsById(restaurants: string[]) {
        return await this.restaurantModel.aggregate([{
            $match: {
                _id: {
                    $in: restaurants
                }
            }
        }, await this.projectDetail()]).exec();
    }

    async addRestaurant(restaurant: CreateRestaurantDto): Promise<void> {
        const newRestaurant = new this.restaurantModel(restaurant);
        await newRestaurant.save();
    }

    private async projectDetail() {
        return {
            $project: {
                name: 1,
                direction: 1,
                price: 1,
                categories: 1,
                picture: {
                    $first: '$pictures'
                }
            }
        };
    }

}