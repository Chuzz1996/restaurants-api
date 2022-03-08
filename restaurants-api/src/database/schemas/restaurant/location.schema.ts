import { Prop } from '@nestjs/mongoose';

export class pointLocation{
    @Prop({
        required: true
    })
    type: string;

    @Prop({
        required: true
    })
    coordinates: number[];
}