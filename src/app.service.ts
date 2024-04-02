import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from './users/users.service';

@Injectable()
export class AppService {

  //의존성 주입(DI). app.modules.ts 파일에 provider에 ConfigService가 있기때문에 new 생성없이 사용할 수 있다. 
  //환경변수 사용을 위해 추가
  constructor(private readonly configService: ConfigService, private usersService: UsersService){}   

  // getHello(): string {
  //   // return 'Hello GET World';
  //   // return process.env.SECRET; //이렇게 해도 되고,
  //   return this.configService.get('DB_PASSWORD'); //이렇게 하므로써 환경변수(.env)가 nestjs의 통제를 받게된다.
  // }

  async getHello() {
    this.usersService.getUsers;
  }

  postHello(): string{
    return 'Hello POST World';
  }
}
