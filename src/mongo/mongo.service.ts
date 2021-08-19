import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/create-user-dto';

@Injectable()
export class MongoService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async saveUser(user: CreateUserDto): Promise<string> {
    const userDocument = await new this.userModel({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      photo: user.photo,
    }).save();

    return userDocument._id;
  }

  async getUsers(): Promise<UserDocument[]> {
    return this.userModel.find({});
  }

  async getUserById(id): Promise<UserDocument> {
    return this.userModel.findById(id);
  }
}
