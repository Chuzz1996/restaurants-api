import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { pointLocation } from './location.schema';
import { UserComments } from './user-comments.schema';

@Schema()
export class Restaurant{
    @Prop({ required: true })
    name: string;

    @Prop({})
    categories: string[];

    @Prop({})
    price?: string;

    @Prop({})
    description?: string;

    @Prop({})
    menu?: string;

    @Prop({})
    direction?: string;

    @Prop({
        type: pointLocation
    })
    location?: pointLocation;

    @Prop({
        type: UserComments
    })
    comments: UserComments[];

    @Prop({})
    pictures?: string[];

    @Prop({ required: true })
    city: string;
}

export type RestaurantDocument = Restaurant & Document;

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);

RestaurantSchema.index({ name: 1, city: 1 }, { unique: true });