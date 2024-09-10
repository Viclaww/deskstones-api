import { Controller, Post, Delete, Param, Body } from '@nestjs/common';
import { ReplyService } from './reply.service';

@Controller('replies')
export class ReplyController {
  constructor(private readonly replyService: ReplyService) {}

  @Post(':commentId')
  async addReply(
    @Param('commentId') commentId: string,
    @Body('content') content: string,
  ) {
    return this.replyService.addReply(commentId, content);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.replyService.deleteReply(id);
  }
}
