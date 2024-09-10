import { Controller, Post, Delete, Param, Body } from '@nestjs/common';
import { CommentService } from './comment.service';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post(':blogId')
  async addComment(
    @Param('blogId') blogId: string,
    @Body('content') content: string,
  ) {
    return this.commentService.addComment(blogId, content);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.commentService.deleteComment(id);
  }
}
