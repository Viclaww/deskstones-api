import {
  MiddlewareConsumer,
  Module,
  Post,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentController } from 'src/comment/comment.controller';
import { CommentSchema } from 'src/models/comment.model';
import { BlogSchema } from 'src/models/post.model';
import { ReplySchema } from 'src/models/reply.model';
import { ReplyController } from 'src/reply/reply.controller';
import { PostController } from './post.controller';
import { ReplyService } from 'src/reply/reply.service';
import { CommentService } from 'src/comment/comment.service';
import { BlogService } from './post.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { WriterOrAddminMiddleware } from 'src/middleware/WriterOrAdmin.middleware';
import { JwtMiddleware } from 'src/middleware/auth.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'blog', schema: BlogSchema },
      { name: 'Comment', schema: CommentSchema },
      { name: 'Reply', schema: ReplySchema },
    ]),
  ],
  controllers: [PostController, CommentController, ReplyController],
  providers: [BlogService, CommentService, ReplyService, CloudinaryService],
  exports: [BlogService, CommentService, ReplyService],
})
export class PostModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware, WriterOrAddminMiddleware)
      .forRoutes({ path: 'posts*create', method: RequestMethod.GET });
  }
}
