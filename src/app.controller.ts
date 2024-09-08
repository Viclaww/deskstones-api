import {
  Controller,
  Get,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { url } from 'inspector';

@Controller()
export class AppController {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly appService: AppService,
  ) {}

  @Post('/image/upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    const data = await this.cloudinaryService.uploadFile(file);
    return {
      status: HttpStatus.OK,
      data: {
        url: data.secure_url,
      },
    };
  }
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
