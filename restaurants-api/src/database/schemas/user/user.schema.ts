import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User{

    @Prop({required: true})
    name: string;

    @Prop({})
    restaurant: [];
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);