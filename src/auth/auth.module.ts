import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "../entity/Users";
import { AuthService } from "./authService";
import { LocalStategy } from "./local.strategy";
import { LocalSerializer } from "./local.serializer";

@Module({
    imports: [
        PassportModule.register({session: true}), //세션 저장
        TypeOrmModule.forFeature([Users]),
    ],
    providers: [AuthService, LocalStategy, LocalSerializer]
})
export class AuthModule {}