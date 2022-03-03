import { IsDefined, IsString } from 'class-validator';

export class CommentDto{
    @IsDefined()
    @IsString()
    user: string;

    @IsDefined()
    @IsString()
    comment: string;
}