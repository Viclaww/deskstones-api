import {
  Module,
  OnModuleInit,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from './config/config';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { BlogService } from './post/post.service';
import { PostController } from './post/post.controller';
import { PostModule } from './post/post.module';
import { AdminModule } from './admin/admin.module';
import { CommentService } from './comment/comment.service';
import { ReplyService } from './reply/reply.service';
import { CommentController } from './comment/comment.controller';
import { ReplyController } from './reply/reply.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AuthModule,
    UsersModule,
    CloudinaryModule,
    PostModule,
    AdminModule,
  ],
  controllers: [
    AppController,
    PostController,
    CommentController,
    ReplyController,
  ],
  providers: [
    AppService,
    ConfigService,
    BlogService,
    CommentService,
    ReplyService,
  ],
})
export class AppModule implements OnModuleInit {
  async onModuleInit() {}
}
