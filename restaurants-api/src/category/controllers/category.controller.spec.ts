import { CategoryController } from './category.controller';
import { CategoryService } from '../services/category.service';

describe('CategoryController', () => {
  let categoryController: CategoryController;

  const categoryService = {
    findCategories: jest.fn().mockResolvedValue({}),
  };

  beforeEach(async () => {
    categoryController = new CategoryController(categoryService as unknown as CategoryService);
  });

  it('should be defined', () => {
    expect(categoryController).toBeDefined();
  });

  it('should be defined', async () => {
    const result = await categoryController.getCategories();
    expect(result).toBeDefined();
    expect(categoryService.findCategories).toBeCalled();
  });
});
