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

@Controller()
export class AppController {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly appService: AppService,
  ) {}

  @Post('/image/upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    try {
      const data = await this.cloudinaryService.uploadFile(file);

      return {
        status: HttpStatus.OK,
        data: {
          url: data.secure_url,
        },
      };
    } catch (error) {
      console.error(error);
    }
  }
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
