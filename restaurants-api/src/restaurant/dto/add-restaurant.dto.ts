import { IsString, IsOptional, IsArray, ValidateNested, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { pointLocation } from'../../database/schemas/restaurant/location.schema';
import { UserComments } from '../../database/schemas/restaurant/user-comments.schema';

export class CreateRestaurantDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    categories: string[];

    @IsOptional()
    @IsString()
    price: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    menu: string;

    @IsOptional()
    @IsString()
    direction: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => pointLocation)
    location: pointLocation;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => UserComments)
    comments: UserComments[];

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    pictures: string[];
}