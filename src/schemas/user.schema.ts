import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as buffer from 'buffer';

export type UserDocument = User & Document;

@Schema({
  versionKey: false,
  collection: 'users',
})
export class User {
  @Prop({
    type: String,
    required: true,
  })
  firstName: string;

  @Prop({
    type: String,
    required: true,
  })
  lastName: string;

  @Prop({
    type: String,
    required: true,
  })
  email: string;

  @Prop({
    type: buffer,
    required: true,
  })
  photo: Buffer;
}

export const UserSchema = SchemaFactory.createForClass(User);
