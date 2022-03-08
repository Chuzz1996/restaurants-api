import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { PaginationDto } from '../dto/pagination.dto';

@Injectable()
export class PaginationValidationPipe implements PipeTransform {
    async transform(
        value: any,
        { metatype }: ArgumentMetadata,
    ): Promise<PaginationDto> {
        const pagination: PaginationDto = {
            skip: 0,
            limit: 10
        };
        pagination.skip = parseInt(value.skip) || 0;
        pagination.limit = parseInt(value.limit) || 10;
        if (value.skip >= value.limit) {
            pagination.limit += 10;
        }
        return pagination;
    }
}