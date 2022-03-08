import { UserService } from './user.service';
import { UserRepository } from '../../database/repository/user.repository';
import { RestaurantRepository } from '../../database/repository/restaurant.repository';
import { NotFoundException } from '../../exceptions/not-found.exception';
import { NotModifiedException } from '../../exceptions/not-modified.exception';

describe('UserService', () => {
  let userService: UserService;

  const userRepository = {
    getRestaurants: jest.fn().mockResolvedValue({ restaurant: ['123', '456'] }),
    existsRestaurant: jest.fn().mockResolvedValue(null),
    addRestaurant: jest.fn().mockResolvedValue({}),
    removeRestaurante: jest.fn().mockResolvedValue({}),
  };

  const restaurantRepository = {
    findRestaurantDetailsById: jest.fn().mockResolvedValue({ _id: '12345' }),
  };

  beforeEach(async () => {
    userService = new UserService(userRepository as unknown as UserRepository,
      restaurantRepository as unknown as RestaurantRepository);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should find restaurant', async () => {
    const result = await userService.findRestaurant('1234');
    expect(result).toBeDefined();
    expect(userRepository.getRestaurants).toBeCalled();
    expect(restaurantRepository.findRestaurantDetailsById).toBeCalled();
  });

  it('should be add restaurant to my favorites', async () => {
    await userService.updateFavoriteRestaurant('1234', { restaurantId: '123', action: 'add' });
    expect(userRepository.existsRestaurant).toBeCalled();
    expect(userRepository.addRestaurant).toBeCalled();
  });

  it('should be remove restaurant to my favorites', async () => {
    await userService.updateFavoriteRestaurant('1234', { restaurantId: '123', action: 'remove' });
    expect(userRepository.removeRestaurante).toBeCalled();
  });

  it('should be not found restaurant without like', async () => {
    userRepository.getRestaurants.mockResolvedValue({ restaurant: [] });
    await expect(userService.findRestaurant('1234')).rejects.toThrowError(NotFoundException);

  });

  it('Update favorite restaurant that not exists', async () => {
    userRepository.existsRestaurant.mockResolvedValue({ '_id': 1 });
    await expect(userService.updateFavoriteRestaurant('1234', { action: 'add', restaurantId: '12345' })).rejects.toThrowError(NotModifiedException);
  });
});
