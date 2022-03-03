import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Restaurant, RestaurantDocument } from '../schemas/restaurant/restaurant.schema';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { RestaurantDetailInterface } from '../interface/restaurant/restaurant-detail.interface';
import { RestaurantInterface } from '../interface/restaurant/restaurant.interface';
import { CommentDto } from "../../restaurant/dto/comment.dto";

@Injectable()
export class RestaurantRepository {

    constructor(@InjectModel(Restaurant.name)
    private readonly restaurantModel: Model<RestaurantDocument>) {
    }

    async findRestaurant(pagination: PaginationDto, category?: string[]): Promise<RestaurantDetailInterface[]> {
        const aggregate = [];
        if (category[0]) {
            aggregate.push({
                $match: {
                    categories: { $in: category }
                }
            })
        }
        aggregate.push(await this.projectDetail());
        return await this.restaurantModel.aggregate(aggregate).skip(pagination.skip).limit(pagination.limit).exec() as RestaurantDetailInterface[];
    }

    async findRestaurantById(restaurantId: string): Promise<RestaurantInterface> {
        return await this.restaurantModel.findOne({ _id: restaurantId }).exec() as RestaurantInterface;
    }

    async addComment(restaurantId: string, comment: CommentDto): Promise<void> {
        const currentDate = new Date();
        await this.restaurantModel.updateOne({ _id: restaurantId }, {
            $push: {
                comments: {
                    user: comment.user, comment: comment.comment, date: currentDate.toISOString().substring(0, 10)
                }
            }
        }).exec();
    }

    async findRestaurantDetailsById(restaurants: string[]){
        return await this.restaurantModel.aggregate([{
            $match:{ _id: { $in: restaurants }}
        },await this.projectDetail()]).exec();
    }

    private async projectDetail(){
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
        }
    }

}