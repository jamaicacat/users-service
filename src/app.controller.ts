import { Controller, Get, Res } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/')
  getHello(@Res() response): any {
    response.sendFile('index.html', { root: './public/' });
  }
}
