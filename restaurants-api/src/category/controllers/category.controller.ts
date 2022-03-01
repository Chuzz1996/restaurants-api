import { Controller, Get, HttpCode } from '@nestjs/common';
import { CategoryI } from '../../database/interface/category/category.interface';
import { CategoryService } from '../services/category.service';

@Controller('category')
export class CategoryController {

    constructor(private readonly categoryService: CategoryService) {
    }

    @Get('/')
    @HttpCode(200)
    async getCategories(): Promise<CategoryI[]>{
        return this.categoryService.findCategories();
    }
}
