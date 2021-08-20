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

Get user by id: http://localhost:3000/users/USER_ID_HERE [GET].
