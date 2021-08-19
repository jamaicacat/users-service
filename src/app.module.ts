import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { MongoService } from './mongo/mongo.service';
import { User, UserSchema } from './schemas/user.schema';
import { UsersController } from './users/users.controller';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://user:v45qSgfko25ONI34@cluster0.f9fg6.mongodb.net/dev?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    ),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MulterModule.register({
      storage: memoryStorage(),
      limits: {
        fileSize: 2097152, // 2 Mb
        files: 1,
        fields: 3,
      },
    }),
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, MongoService],
})
export class AppModule {}
