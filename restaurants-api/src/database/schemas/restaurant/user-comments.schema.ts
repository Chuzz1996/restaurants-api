import { Prop } from '@nestjs/mongoose';

export class UserComments{
    @Prop({
        required:true,
    })
    user: string;

    @Prop({required: true})
    comment: string;
}