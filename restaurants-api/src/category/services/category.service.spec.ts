import { CategoryService } from './category.service';
import { CategoryRepository } from '../../database/repository/category.repository';

describe('CategoryService', () => {
  let categoryService: CategoryService;

  const categoryRepository = {};

  beforeEach(async () => {
    categoryService = new CategoryService(categoryRepository as unknown as CategoryRepository);
  });

  it('should be defined', () => {
    expect(categoryService).toBeDefined();
  });
});
