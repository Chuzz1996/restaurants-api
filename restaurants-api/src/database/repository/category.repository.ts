import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from '../schemas/category/category.schema';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { CategoryI } from '../interface/category/category.interface';

@Injectable()
export class CategoryRepository {

    constructor(@InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>) {
    }

    async findCategories(): Promise<CategoryI[]> {
        return this.categoryModel.find().exec();
    }
}