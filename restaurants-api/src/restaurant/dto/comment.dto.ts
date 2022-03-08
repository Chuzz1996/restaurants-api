import { IsDefined, IsString } from 'class-validator';

export class CommentDto {
    
    @IsDefined()
    @IsString()
    user: string;

    @IsString()
    comment?: string;

    @IsString()
    commentId?: string;

    @IsDefined()
    @IsString()
    action: string;

    @IsString()
    qualification?: number;
}