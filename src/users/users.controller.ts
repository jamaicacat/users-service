import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseInterceptors
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateUserDto } from "../dto/create-user-dto";
import { UserDocument } from "../schemas/user.schema";
import { MongoService } from "../mongo/mongo.service";
import { UserIdDto } from "../dto/user-id.dto";
import * as sharp from "sharp";

@Controller('users')
export class UsersController {
  constructor(private readonly mongoService: MongoService) {}

  @Get('/')
  async getUsers(): Promise<UserDocument[]> {
    return this.mongoService.getUsers();
  }

  @Post('/create')
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
    const photoBuffer = photo.buffer;
    const metadata = await sharp(photoBuffer).metadata();
    const width = metadata.width;
    const height = metadata.height;

    if (width < 200 || height < 200) {
      throw new HttpException(
        'Too small image size! Must be 200x200 at least.',
        HttpStatus.BAD_REQUEST,
      );
    }

    body.photo = await sharp(photoBuffer)
      .extract({
        left: Math.round(width / 2 - 100),
        top: Math.round(height / 2 - 100),
        width: 200,
        height: 200,
      })
      .toBuffer();

    return this.mongoService.saveUser(body);
  }

  @Get('/:id')
  async getUserById(@Param() params: UserIdDto) {
    return this.mongoService.getUserById(params.id);
  }
}
