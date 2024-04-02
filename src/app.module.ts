import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';  //@nestjs/config 설치 후 모듈추가
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { UsersModule } from './users/users.module';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { ChannelsModule } from './channels/channels.module';
import { DmsModule } from './dms/dms.module';
import { UsersService } from './users/users.service';

const getEnv = () => {
  // 여기서 하드코딩 값이 아니라 VAULT 등 솔루션으로부터 값을 받아올 수 있다. async/await을 사용할 수 있다.
  // axios.get 등...
  return {
    DB_PASSWORD: 'qwer1234',
    NAME: 'VMWARE'
  }
}

// imports에 ConfigModule 추가. 이제 root 폴더에서 .env를 사용할 수 있다. getEnv에서 리턴하는 값들을 사용할 수 있다.
// 물론 .dotenv 파일에 있는 환경변수도 사용할 수 있다.
@Module({
  imports: [ConfigModule.forRoot({isGlobal: true, load: [getEnv]}), UsersModule, WorkspacesModule, ChannelsModule, DmsModule],   
  controllers: [AppController],
  providers: [AppService, ConfigService, UsersService],    
  // AppService의 원형은 아래와 같다. 아래 구조(provide, useClass)를 알아야 custom 의존성을 만들 때 좋다.
  // {
  //   provide: AppService,
  //   useClass: AppService
  // }
  // 예를들어 아래와 같은 커스텀 의존성을 만든다. 그리고 AppController로 이동하여 inject 실행.
  // {
  //   provider: 'CUSTOM_KEY',
  //   useValue: 'CUSTOM_VALUE'
  // }
})

// LoggerMiddleware 연결을 위해 작성. 추가되는 미들웨어들은 AppModule 클래스에서 consumer에 추가한다. 알아볼 것
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
