/// <reference types="multer" />
import { CreateUserDto } from "../dto/create-user-dto";
import { UserDocument } from "../schemas/user.schema";
import { MongoService } from "../mongo/mongo.service";
import { UserIdDto } from "../dto/user-id.dto";
export declare class UsersController {
    private readonly mongoService;
    constructor(mongoService: MongoService);
    getUsers(): Promise<UserDocument[]>;
    createUser(photo: Express.Multer.File, body: CreateUserDto): Promise<any>;
    getUserById(params: UserIdDto): Promise<UserDocument>;
}
