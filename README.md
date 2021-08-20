# users-service
Test app made with NestJS and Mongo DB for saving users' info

To start this app, run ``` npm install ``` and then, run ``` npm run start ```. App will work at http://localhost:3000/

# If you have problems with install !!!
```
Something went wrong installing the "sharp" module

Cannot find module '../build/Release/sharp-win32-x64.node'
```
Try removing 'sharp' folder from node_modules and reinstalling it with ``` npm install sharp ``` or [visit official install documentation](https://sharp.pixelplumbing.com/install)

# API
Get all users: http://localhost:3000/users [GET].

Create user: http://localhost:3000/users/create [POST]. 
Required data ([decorators explained here](https://github.com/typestack/class-validator)): 
``` javasript
export class CreateUserDto {
  @IsString({ message: 'Name must be a string' })
  @MinLength(2, { message: "Name can't be shorter than 2 letters" })
  @Matches(/^([A-Z][a-z]+)$/, {
    message: 'First name must start with Capital letter',
  })
  firstName: string;

  @IsString({ message: 'Surname must be a string' })
  @MinLength(2, { message: "Surname can't be shorter than 2 letters" })
  @Matches(/^([A-Z][a-z]+)$/, {
    message: 'Last name must start with Capital letter',
  })
  lastName: string;

  @IsEmail({ allow_ip_domain: false })
  email: string;

  photo: Buffer;
}
```

Get user by id: http://localhost:3000/users/USER_ID_HERE [GET].
