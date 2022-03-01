import { IsInt, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationDto {

    @IsInt()
    @Min(0)
    @ApiPropertyOptional({
            description: 'Number of pages to skip',
            example: 5,
            default: 0,
            minimum: 0,
        })
    skip: number;

    @IsInt()
    @Min(1)
    @ApiPropertyOptional({
            description: 'Number of result per page',
            example: 15,
            default: 10,
            minimum: 1,
        })
    limit: number;
}