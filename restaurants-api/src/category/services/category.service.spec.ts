import { CategoryService } from './category.service';
import { CategoryRepository } from '../../database/repository/category.repository';

describe('CategoryService', () => {
  let categoryService: CategoryService;

  const categoryRepository = {
    findCategories: jest.fn().mockResolvedValue({}),
  };

  beforeEach(async () => {
    categoryService = new CategoryService(categoryRepository as unknown as CategoryRepository);
  });

  it('should be defined', () => {
    expect(categoryService).toBeDefined();
  });

  it('should be get categories', async () => {
    const result = await categoryService.findCategories();
    expect(result).toBeDefined();
    expect(categoryRepository.findCategories).toBeCalled();
  });
});
