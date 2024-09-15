import {
  Controller,
  Post,
  Delete,
  Param,
  Body,
  Query,
  Get,
} from '@nestjs/common';
import { CommentService } from './comment.service';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  async findCommentsForBlog(@Query('blogId') blogId: string) {
    return this.commentService.findCommentsByBlogId(blogId);
  }

  @Post(':blogId')
  async addComment(@Body() body: any, @Param('blogId') blogId: string) {
    console.log(body, 'meeee', blogId);
    return this.commentService.addComment(
      blogId,
      body.content,
      body.name,
      body.email,
    );
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.commentService.deleteComment(id);
  }
}
