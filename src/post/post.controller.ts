import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { BlogService } from './post.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: BlogService,
    private cloudinaryService: CloudinaryService,
  ) {}
  @Get()
  async getPosts() {
    return this.postService.findAll();
  }
  @Get(':slug')
  async getPost(@Param() slug: string) {
    console.log(slug);
    return this.postService.findbySlug(slug);
  }

  @Post('create')
  async createPost(@Body() body: any) {
    const imageData = await this.cloudinaryService.uploadFile(body.image);

    return this.postService.create({
      title: body.title,
      description: body.description,
      image: imageData.url,
      categories: body.categories,
      content: body.content,
    });
  }

  @Get()
  async getPostByCategory(@Query('category') category: string) {
    console.log(category);
    return this.postService.findManyByCategory(category);
  }
}
