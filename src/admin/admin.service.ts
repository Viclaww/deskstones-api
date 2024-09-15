import { Injectable } from '@nestjs/common';
import { BlogService } from 'src/post/post.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly userService: UsersService,
    private readonly blogService: BlogService,
  ) {}
  async makeAUserWriter(userId: string) {
    // Make a user a writer
    const updatedUser = await this.userService.updateUser(userId, {
      role: 'writer',
    });
    return updatedUser;
  }
  async makeAUserAdmin(userId: string) {
    // Make a user an admin
    const updatedUser = await this.userService.updateUser(userId, {
      role: 'admin',
    });
    return updatedUser;
  }
  async removeAUserWriter(userId: string) {
    // Remove a user from being a writer
    const updatedUser = await this.userService.updateUser(userId, {
      role: 'user',
    });
    return updatedUser;
  }

  async removeAUserAdmin(userId: string) {
    // Remove a user from being an admin
    const updatedUser = await this.userService.updateUser(userId, {
      role: 'user',
    });
    return updatedUser;
  }
  async rejectBlogPost(blogId: string, message: string) {
    const updatedBlog = await this.blogService.updateBlog(blogId, {
      published: false,
      rejectionMessage: message,
      inReview: false,
    });

    return updatedBlog;
  }

  async approveBlogPost(blogId: string) {
    const updatedBlog = await this.blogService.updateBlog(blogId, {
      published: true,
      inReview: false,
      publicationDate: new Date(),
    });

    return updatedBlog;
  }

  async deleteBlogPost(blogId: string) {
    const deletedBlog = await this.blogService.deleteBlog(blogId);

    return deletedBlog;
  }

  async deleteComment(commentId: string) {
    const deletedComment = await this.blogService.deleteComment(commentId);

    return deletedComment;
  }

  async deleteReply(replyId: string) {
    const deletedReply = await this.blogService.deleteReply(replyId);

    return deletedReply;
  }
}
