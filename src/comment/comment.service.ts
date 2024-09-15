import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from '../models/comment.model';
import { BlogService } from '../post/post.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
    private readonly blogService: BlogService,
  ) {}

  async findAll(): Promise<Comment[]> {
    return this.commentModel.find().exec();
  }

  async findCommentsByBlogId(blogId: string): Promise<Comment[]> {
    return this.commentModel.find({ blogId }).exec();
  }

  async findOne(id: string): Promise<Comment> {
    return this.commentModel.findById(id);
  }
  async addComment(
    blogId: string,
    content: string,
    name: string,
    email: string,
  ): Promise<Comment> {
    const blog = await this.blogService.findOne(blogId);
    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    const newComment = new this.commentModel({ blogId, content, name, email });
    const savedComment = await newComment.save();

    blog.comments.push(savedComment);
    await blog.save();

    return savedComment;
  }

  async deleteComment(id: string): Promise<any> {
    return this.commentModel.findByIdAndDelete(id);
  }
}
