import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Reply extends Document {
  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ type: Types.ObjectId, ref: 'Comment', required: true })
  commentId: string;
}

export const ReplySchema = SchemaFactory.createForClass(Reply);
