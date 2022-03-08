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

  it('should be get restaurant by filter', async() => {
    const result = await restaurantController.getRestaurants({skip:1,limit:2},['testcategory']);
    expect(result).toBeDefined();
    expect(restaurantService.getRestaurants).toBeCalled();
  });

  it('should be get restaurant by filter', async() => {
    const result = await restaurantController.getRestaurants({skip:1,limit:2},['testcategory']);
    expect(result).toBeDefined();
    expect(restaurantService.getRestaurants).toBeCalled();
  });

  it('should be get restaurant details', async() => {
    const result = await restaurantController.getDataRestaurant('12345');
    expect(result).toBeDefined();
    expect(restaurantService.getRestaurantDetail).toBeCalled();
  });

  it('should be add restaurant comment', async() => {
    await restaurantController.addComment('12345',{comment:'cool',action:'add',user:'12345'});
    expect(restaurantService.addCommentToRestaurant).toBeCalled();
  });

});
