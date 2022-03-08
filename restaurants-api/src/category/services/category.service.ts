import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../../database/repository/category.repository';
import { CategoryI } from '../../database/interface/category/category.interface';
import { NotFoundException } from '../../exceptions/not-found.exception';

@Injectable()
export class CategoryService {

    constructor(private readonly categoryRepository: CategoryRepository) {
    }

    async findCategories(): Promise<CategoryI[]> {
        const result = await this.categoryRepository.findCategories();
        if (!result) {
            throw new NotFoundException('Not found categories');
        }
        return result;
    }
}
