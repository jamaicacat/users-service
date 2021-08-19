/// <reference types="node" />
import { Document } from 'mongoose';
export declare type UserDocument = User & Document;
export declare class User {
    firstName: string;
    lastName: string;
    email: string;
    photo: Buffer;
}
export declare const UserSchema: import("mongoose").Schema<Document<User, any, any>, import("mongoose").Model<Document<User, any, any>, any, any>, undefined, {}>;