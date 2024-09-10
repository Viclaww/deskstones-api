import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog } from '../models/post.model';
import { CreateBlogDto } from './dto';

@Injectable()
export class BlogService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<Blog>) {}

  async checkSlug(slug: string): Promise<boolean> {
    const blog = await this.blogModel.findOne({ slug });
    if (blog) {
      return true;
    }
    return false;
  }
  async create({
    title,
    description,
    image,
    categories,
    content,
  }: CreateBlogDto): Promise<Blog> {
    let slug = title.toLowerCase().split(' ').join('-');
    let slugExists = await this.checkSlug(slug);

    if (slugExists) {
      slug = `${slug}-${Math.floor(Math.random() * 10000)}`;
      slugExists = await this.checkSlug(slug);
    }
    const newBlog = new this.blogModel({
      title,
      description,
      image,
      categories,
      content,
      slug,
    });

    return newBlog.save();
  }

  async findAll(): Promise<Blog[]> {
    return this.blogModel.find().exec();
  }

  async findOne(id: string): Promise<Blog> {
    const blog = await this.blogModel.findById(id).populate({
      path: 'comments',
      populate: { path: 'replies' },
    });
    if (!blog) {
      throw new NotFoundException('Blog not found');
    }
    return blog;
  }

  async findbySlug(slug: string): Promise<Blog> {
    return this.blogModel.findOne({ slug }).populate('comments').exec();
  }

  async findManyByCategory(category: string): Promise<Blog[]> {
    return this.blogModel.find({ categories: { $in: [category] } }).exec();
  }

  async update(id: string, updateBlogDto: any): Promise<Blog> {
    return this.blogModel.findByIdAndUpdate(id, updateBlogDto, { new: true });
  }

  async delete(id: string): Promise<any> {
    return this.blogModel.findByIdAndDelete(id);
  }
}
