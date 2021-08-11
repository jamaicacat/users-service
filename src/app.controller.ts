import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUserDto } from './dto/create-user-dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/createUser')
  @UseInterceptors(
    FileInterceptor('photo', {
      fileFilter: (req, file, cb) => {
        const reg = /\.(jpg|jpeg|png)$/i;
        if (!reg.test(file.originalname)) {
          return cb(new Error('Unsupported image file type'), false);
        }
        cb(null, true);
      },
    }),
  )
  async createUser(
    @UploadedFile() photo: Express.Multer.File,
    @Body() body: CreateUserDto,
  ): Promise<any> {
    console.log('body', body);
    console.log('photo', photo);
  }
}
