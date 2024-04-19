import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from '../service/restaurant.service';

describe('RestaurantController', () => {
  let restaurantController: RestaurantController;

  const restaurantService = {
    getRestaurants: jest.fn().mockResolvedValue({}),
    getRestaurantDetail: jest.fn().mockResolvedValue({}),
    addCommentToRestaurant: jest.fn().mockResolvedValue(null),
  };

  beforeEach(async () => {
    restaurantController = new RestaurantController(restaurantService as unknown as RestaurantService);
  });

  it('should be defined', () => {
    expect(restaurantController).toBeDefined();
  });
});
