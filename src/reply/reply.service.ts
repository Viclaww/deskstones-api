import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reply } from '../models/reply.model';
import { CommentService } from '../comment/comment.service';

@Injectable()
export class ReplyService {
  constructor(
    @InjectModel(Reply.name) private replyModel: Model<Reply>,
    private readonly commentService: CommentService,
  ) {}

  async addReply(commentId: string, content: string): Promise<Reply> {
    const comment = await this.commentService.findOne(commentId);
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    const newReply = new this.replyModel({ commentId, content });
    const savedReply = await newReply.save();

    comment.replies.push(savedReply);
    await comment.save();

    return savedReply;
  }

  async deleteReply(id: string): Promise<any> {
    return this.replyModel.findByIdAndDelete(id);
  }
}
