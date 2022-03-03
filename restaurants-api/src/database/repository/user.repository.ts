import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user/user.schema';
import {UserRestaurantInterface} from "../interface/user/user-restaurant.interface";

@Injectable()
export class UserRepository {

    constructor(@InjectModel(User.name)
                private readonly UserModel: Model<UserDocument>) {
    }

    async getRestaurants(userId: string):Promise<UserRestaurantInterface>{
        return await this.UserModel.findOne({_id:userId},{ _id:0, restaurant:1 }).exec() as UserRestaurantInterface;
    }

    async addRestaurant(userId: string, restaurant: string): Promise<void>{
        await this.UserModel.updateOne({ _id: userId },{ $push: {restaurant: restaurant }});
    }

}