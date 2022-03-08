import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user/user.schema';
import { UserRestaurantInterface } from '../interface/user/user-restaurant.interface';
import { UserRestaurantExistsInterface } from '../interface/user/user-restaurant-exists.interface';

@Injectable()
export class UserRepository {

    constructor(@InjectModel(User.name)
    private readonly userModel: Model<UserDocument>) {
    }

    async getRestaurants(userId: string): Promise<UserRestaurantInterface> {
        return await this.userModel.findOne({
            _id: userId
        }, {
            _id: 0,
            restaurant: 1
        }).exec() as UserRestaurantInterface;
    }

    async addRestaurant(userId: string, restaurant: string): Promise<number> {
        const result = await this.userModel.updateOne({
            _id: userId
        }, {
            $push: {
                restaurant: restaurant
            }
        });
        return result.modifiedCount;
    }

    async removeRestaurante(userId: string, restaurant: string): Promise<number> {
        const result = await this.userModel.updateOne({
            _id: userId
        }, {
            $pull: {
                restaurant: restaurant
            }
        });
        return result.modifiedCount;
    }

    async existsRestaurant(userId: string, restaurant: string): Promise<UserRestaurantExistsInterface> {
        return await this.userModel.findOne({
            _id: userId,
            restaurant: {
                $in: [restaurant]
            }
        }, {
            _id: 1
        }).exec();
    }

    async findUserById(userId: string) {
        return await this.userModel.findOne({
            _id: userId
        }, {
            _id: 1
        }).exec();
    }

}