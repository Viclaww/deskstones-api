import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { BlogService } from 'src/post/post.service';
import { UsersService } from 'src/users/users.service';
import { PostModule } from 'src/post/post.module';
import { UsersModule } from 'src/users/users.module';
import { JwtMiddleware } from 'src/middleware/auth.middleware';
import { AdminMiddleware } from 'src/middleware/admin.middleware';

@Module({
  imports: [UsersModule, PostModule],
  controllers: [AdminController],
  providers: [AdminService, UsersService, BlogService],
  exports: [AdminService, UsersService],
})
export class AdminModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware, AdminMiddleware).forRoutes('admin');
  }
}
