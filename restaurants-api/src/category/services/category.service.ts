import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../../database/repository/category.repository';
import { CategoryI } from '../../database/interface/category/category.interface';

@Injectable()
export class CategoryService {

    constructor(private readonly categoryRepository: CategoryRepository) {
    }

    async findCategories():Promise<CategoryI[]>{
        return await this.categoryRepository.findCategories();
    }
}
