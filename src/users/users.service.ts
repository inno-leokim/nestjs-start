import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entity/Users';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(Users) // 의존성 주입(Dependency Injection)
        private usersRepository: Repository<Users>,
    ) {}

    getUsers(){
        
    }

    async postUsers(email: string, nickname: string, password: string){

        if(!email){
            throw new Error(`전달된 이메일 주소가 없습니다.`); //async 함수에서는 throw를 하더라도 서버가 죽지 않아, 200 status 코드가 발생된다.
        }

        if(!nickname){
            throw new Error(`전달된 넥네임이 없습니다.`);
        }

        if(!password){
            throw new Error(`전달된 패스워드가 없습니다.`);
        }

        const user = await this.usersRepository.findOne({where: {email}});

        if(user) {
            // 이미 존재하는 유저에 대한 에러 발생
            throw new Error(`이미 존재하는 사용자입니다.`);
            // return; // throw가 리턴 기능이 있기 때문에 필요없다.
        } 

        const hashedPassword = await bcrypt.hash(password, 12);

        await this.usersRepository.save({
            email, 
            nickname,
            password: hashedPassword
        });
    }

}
