import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entity/Users';

@Module({
  imports: [TypeOrmModule.forFeature([Users])], //repository가 userservice에 인젝션된다. app.module에도 추가해야 한다.
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
