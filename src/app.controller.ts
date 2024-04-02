import { Controller, Get, Inject, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api') //공통주소
export class AppController {

  //의존성 주입(DI). app.modules.ts 파일에 providers에 AppService가 있기 때문에 new 생성없이 사용할 수 있다.
  constructor(
    private readonly appService: AppService
    // @Inject('CUSTOM_KEY') private readonly customValue //providers에 추가되어 있다.
  ) {}

  @Get('hello')
  getHello(): Promise<void> {
    return this.appService.getHello();
  }

  @Post('hello')
  postHello(): string {
    return this.appService.postHello();
  }
}
