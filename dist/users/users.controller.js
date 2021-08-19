"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const create_user_dto_1 = require("../dto/create-user-dto");
const mongo_service_1 = require("../mongo/mongo.service");
const user_id_dto_1 = require("../dto/user-id.dto");
const sharp = require("sharp");
let UsersController = class UsersController {
    constructor(mongoService) {
        this.mongoService = mongoService;
    }
    async getUsers() {
        return this.mongoService.getUsers();
    }
    async createUser(photo, body) {
        const photoBuffer = photo.buffer;
        const metadata = await sharp(photoBuffer).metadata();
        const width = metadata.width;
        const height = metadata.height;
        if (width < 200 || height < 200) {
            throw new common_1.HttpException('Too small image size! Must be 200x200 at least.', common_1.HttpStatus.BAD_REQUEST);
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
    async getUserById(params) {
        return this.mongoService.getUserById(params.id);
    }
};
__decorate([
    common_1.Get('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUsers", null);
__decorate([
    common_1.Post('/create'),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('photo', {
        fileFilter: (req, file, cb) => {
            const reg = /\.(jpg|jpeg|png)$/i;
            if (!reg.test(file.originalname)) {
                return cb(new Error('Unsupported image file type'), false);
            }
            cb(null, true);
        },
    })),
    __param(0, common_1.UploadedFile()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createUser", null);
__decorate([
    common_1.Get('/:id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_id_dto_1.UserIdDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserById", null);
UsersController = __decorate([
    common_1.Controller('users'),
    __metadata("design:paramtypes", [mongo_service_1.MongoService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map