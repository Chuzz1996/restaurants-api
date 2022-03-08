import { RestaurantService } from './restaurant.service';
import { RestaurantRepository } from '../../database/repository/restaurant.repository';
import { UserRepository } from '../../database/repository/user.repository';
import { NotFoundException } from '../../exceptions/not-found.exception';

describe('RestaurantService', () => {
  let restaurantService: RestaurantService;

  const restaurantRepository = {
    findRestaurant: jest.fn().mockResolvedValue({ data: [{ _id: 1 }] }),
    findRestaurantById: jest.fn().mockResolvedValue({}),
    addComment: jest.fn().mockResolvedValue({}),
    updateCommentStatus: jest.fn().mockResolvedValue({}),
  };

  const userRepository = {
    findUserById: jest.fn().mockResolvedValue({ _id: '1234' }),
  };

  beforeEach(async () => {
    restaurantService = new RestaurantService(restaurantRepository as unknown as RestaurantRepository,
      userRepository as unknown as UserRepository);
  });

  it('should be defined', () => {
    expect(restaurantService).toBeDefined();
  });

  it('should be get restaurant filter', () => {
    const result = restaurantService.getRestaurants({ skip: 0, limit: 10 }, ['aa']);
    expect(result).toBeDefined();
    expect(restaurantRepository.findRestaurant).toBeCalled();
  });

  it('should be get restaurant details', () => {
    const result = restaurantService.getRestaurantDetail('12344');
    expect(result).toBeDefined();
    expect(restaurantRepository.findRestaurantById).toBeCalled();
  });

  it('should be add a restaurant comment', async () => {
    await restaurantService.addCommentToRestaurant('12344', { user: '1234', action: 'add', comment: 'i like it' });
    expect(userRepository.findUserById).toBeCalled();
    expect(restaurantRepository.addComment).toBeCalled();
  });

  it('should be like a restaurant comment', async () => {
    await restaurantService.addCommentToRestaurant('12344', { user: '1234', action: 'like', commentId: '12345' });
    expect(userRepository.findUserById).toBeCalled();
    expect(restaurantRepository.updateCommentStatus).toBeCalled();
  });

  it('should be unlike a restaurant comment', async () => {
    await restaurantService.addCommentToRestaurant('12344', { user: '1234', action: 'unlike', commentId: '12345' });
    expect(userRepository.findUserById).toBeCalled();
    expect(restaurantRepository.updateCommentStatus).toBeCalled();
  });

  it('should be not found restaurants by filter', async () => {
    restaurantRepository.findRestaurant.mockResolvedValue([]);
    await expect(restaurantService.getRestaurants({ skip: 0, limit: 1 }, ['aa'])).rejects.toThrowError(NotFoundException);
  });

  it('should be not found restaurants details', async () => {
    restaurantRepository.findRestaurantById.mockResolvedValue(null);
    await expect(restaurantService.getRestaurantDetail('123')).rejects.toThrowError(NotFoundException);
  });
});
