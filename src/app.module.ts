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
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelChats } from './entity/ChannelChats';
import { ChannelMembers } from './entity/ChannelMembers';
import { Channels } from './entity/Channels';
import { DMs } from './entity/DMs';
import { Mentions } from './entity/Mentions';
import { Users } from './entity/Users';
import { WorkspaceMembers } from './entity/WorkspaceMembers';
import { Workspaces } from './entity/Workspaces';

const getEnv = () => {
  // 여기서 하드코딩 값이 아니라 VAULT 등 솔루션으로부터 값을 받아올 수 있다. async/await을 사용할 수 있다.
  // axios.get 등...
  return {
    DB_PASSWORD: 'qwer1234',
    NAME: 'VMWARE'
  }
}

// typeorm-extension은 app.module.ts 설정을 못 읽어온다. 따라서 dataSource.ts 파일을 생성했다.

// imports에 ConfigModule 추가. 이제 root 폴더에서 .env를 사용할 수 있다. getEnv에서 리턴하는 값들을 사용할 수 있다.
// 물론 .dotenv 파일에 있는 환경변수도 사용할 수 있다.
@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true, load: [getEnv]}), 
    UsersModule, 
    WorkspacesModule, 
    ChannelsModule, 
    DmsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT,10),
      database: process.env.DB_DATABASE,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      synchronize: false, // true로 할 경우 entity 클래스들이 DB에 생성된다. 조심해야 한다.
      // entities: ['entity/*.js'], // 전체를 불러올 수 있다.
      entities: [
        ChannelChats,
        ChannelMembers,
        Channels,
        DMs,
        Mentions,
        Users,
        WorkspaceMembers,
        Workspaces,
      ], // 하나씩 입력하는 방법도 있다.
      keepConnectionAlive: true, //hot reload를 위해서 설정
      migrations: [__dirname + '/migrations/*.ts'],
      charset: 'utf8mb4_general_ci', // 이모티콘을 사용하기 위해 설정
      logging: true,
      // autoLoadEntities: true, //자동으로 entity를 불러오는 기능. 버그가 있을 수 있다.
    }),
    TypeOrmModule.forFeature([Users])
  ],   
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
