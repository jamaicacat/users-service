import { UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/create-user-dto';
export declare class MongoService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    saveUser(user: CreateUserDto): Promise<string>;
    getUsers(): Promise<UserDocument[]>;
    getUserById(id: any): Promise<UserDocument>;
}
