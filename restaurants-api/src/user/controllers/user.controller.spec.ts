import { UserController } from './user.controller';
import { UserService } from '../service/user.service';

describe('UserController', () => {
  let userController: UserController;

  const userService = {
    findRestaurant: jest.fn().mockResolvedValue([{
      id: 'test'
    }]),
    updateFavoriteRestaurant: jest.fn().mockResolvedValue([]),
  };

  beforeEach(async () => {
    userController = new UserController(userService as unknown as UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  it('should by find their favourite restaurants', async () => {
      expect(await userController.getRestaurant('userId')).toBeDefined();
  });

  it('should be add my favorite restaurant',async ()=>{
    await userController.addRestaurant('userId',{
      action: 'add',
      restaurantId: '12345'
    });
    expect(userService.updateFavoriteRestaurant).toBeCalled();
  });

  it('should be remove my favorite restaurant',async ()=>{
    await userController.addRestaurant('userId',{
      action: 'remove',
      restaurantId: '12345'
    });
    expect(userService.updateFavoriteRestaurant).toBeCalled();
  });
});
