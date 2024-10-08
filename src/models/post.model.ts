import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';
import { Comment } from './comment.model';

@Schema({ timestamps: true })
export class Blog extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  slug: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  image: string;

  @Prop({ default: false })
  published: boolean;

  @Prop({ default: null })
  datePublished: Date;

  @Prop({ default: true })
  inReview: boolean;

  @Prop({ default: false })
  isRejected: boolean;

  @Prop({ default: 0 })
  likes: number;

  @Prop({ type: [{ type: String }] })
  categories: string[];

  @Prop({ required: true })
  content: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Comment' }] })
  comments: Comment[];

  @Prop({ default: undefined })
  rejectionMessage: string;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
