import { UserService } from './user.service';
import { UserRepository } from '../../database/repository/user.repository';
import { RestaurantRepository } from '../../database/repository/restaurant.repository';

describe('UserService', () => {
  let userService: UserService;

  const userRepository = {
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


});
