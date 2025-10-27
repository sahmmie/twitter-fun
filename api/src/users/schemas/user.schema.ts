import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Exclude password from JSON responses
UserSchema.set('toJSON', {
  transform: function (doc, ret) {
    const transformed: any = ret;
    transformed.id = transformed._id;
    delete transformed._id;
    delete transformed.__v;
    delete transformed.password;
    return transformed;
  },
});

