import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Next,
  Param,
  Post,
} from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('promote/:userId/:role')
  async udpatUserRole(@Param() params: any, @Next() next: any) {
    try {
      if (params.role == 'admin') {
        const user = await this.adminService.makeAUserAdmin(params.userId);
        return {
          status: HttpStatus.OK,
          message: 'User Updated successfully',
        };
      }
      if (params.role == 'writer') {
        await this.adminService.makeAUserWriter(params.userId);
        return {
          status: HttpStatus.OK,
          message: 'User Updated successfully',
        };
      }
    } catch (error) {
      next(error);
    }
  }

  @Get('demote/:userId')
  async demoteUser(@Param('userId') userId: string, @Next() next: any) {
    try {
      await this.adminService.removeAUserAdmin(userId);
      return {
        status: HttpStatus.OK,
        message: 'User Updated successfully',
      };
    } catch (error) {
      next(error);
    }
  }
  @Get('post/aprrove/:blogId')
  async approvePost(@Param('blogId') blogId: string, @Next() next: any) {
    try {
      const post = await this.adminService.approveBlogPost(blogId);
      return {
        status: HttpStatus.OK,
        data: post,
        message: 'Post approved',
      };
    } catch (error) {
      next(error);
    }
  }

  @Post('post/reject/:blogId')
  async rejectPost(
    @Body() body: any,
    @Param('blogId') blogId: string,
    @Next() next: any,
  ) {
    try {
      const post = await this.adminService.rejectBlogPost(blogId, body.message);
      return {
        status: HttpStatus.OK,
        message: 'Post rejected',
      };
    } catch (error) {
      next(error);
    }
  }
}
