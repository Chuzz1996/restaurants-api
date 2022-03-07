import { Prop } from '@nestjs/mongoose';

export class UserComments{
    @Prop({
        required: true,
    })
    commentId: string;

    @Prop({
        required:true,
    })
    user: string;

    @Prop({ required: true })
    comment: string;

    @Prop({ required: true })
    date: string;

    @Prop({default: 0})
    userQualification: number;
}