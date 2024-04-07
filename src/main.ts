import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './httpException.filter';
import { ValidationPipe } from '@nestjs/common';
import passport from 'passport';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000; //포트를 환경변수에서 설정할 수 있도록 수정.
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe()); //class-validator를 사용하기 위해 추가한다.
  app.use(passport.initialize());
  app.use(passport.session());
  /**
   * 스웨거(swagger) 관련 설정
  */
 // 빌더 패턴
 const config = new DocumentBuilder()
 .setTitle('Messanger API')
 .setDescription('메신저 개발을 위한 API 문서입니다.')
 .setVersion('1.0')  //버전
 .addCookieAuth('connect.sid') //쿠키가 있어야 접속할 수 있다.
 .build();
 
 const document = SwaggerModule.createDocument(app, config);
 SwaggerModule.setup('api', app, document);
 
 // 스웨거 설정 끝!!
 
 await app.listen(port); // 3000 => port로 변경. await이므로 스웨거 설정 아래 있어야 한다.
 console.log(`listening on port ${port}`); //그냥 추가함.

  // 핫리로딩(hot reload)를 위한 추가
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

}

bootstrap();
