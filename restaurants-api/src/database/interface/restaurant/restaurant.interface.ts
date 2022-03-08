import { CommentsI } from './comments.interface';
import { PointLocationI } from './point-location.interface';

export interface RestaurantInterface {
    _id: string;
    name: string;
    categories: string[];
    price?: string;
    description?: string;
    menu?: string;
    direction?: string;
    location?: PointLocationI;
    comments?: CommentsI[];
    pictures?: string[];
    city: string;
}