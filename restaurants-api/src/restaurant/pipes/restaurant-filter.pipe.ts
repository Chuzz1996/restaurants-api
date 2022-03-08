import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class RestaurantFilterPipe implements PipeTransform {

    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        if (value?.category) {
            value.category = value.category.split(',');
            return value.category;
        }
    }
}