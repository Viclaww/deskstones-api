import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BlogService } from './post.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: BlogService,
    private cloudinaryService: CloudinaryService,
  ) {}

  @Get()
  async getPostByCategory(@Query('category') category: string) {
    if (!category) {
      return this.postService.getAllPublishedPosts();
    }
    return this.postService.getAllPublishedForaCategory(category);
  }

  @Get('categories')
  async getCategories() {
    return this.postService.getAllCategories();
  }

  @Get(':slug')
  async getPost(@Param('slug') slug: string) {
    return this.postService.findbySlug(slug);
  }

  @Post('create')
  @UseInterceptors(FileInterceptor('image'))
  async createPost(
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const imageData = await this.cloudinaryService.uploadFile(file);
    return this.postService.create({
      title: body.title,
      description: body.description,
      image: imageData.url,
      categories: body.categories,
      content: body.content,
    });
  }
}
