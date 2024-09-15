import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from './config/config';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { PostController } from './post/post.controller';
import { PostModule } from './post/post.module';
import { AdminModule } from './admin/admin.module';
import { CommentController } from './comment/comment.controller';
import { ReplyController } from './reply/reply.controller';
import { AdminService } from './admin/admin.service';
import { AdminController } from './admin/admin.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MongoDb.uri'),
      }),
      inject: [ConfigService],
    }),

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
    AdminController,
  ],

  providers: [AppService, ConfigService],
})
export class AppModule implements OnModuleInit {
  async onModuleInit() {}
}
