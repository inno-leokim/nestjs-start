import { UsersService } from "src/users/users.service";
import { Users } from "../entity/Users";
import bcrypt from 'bcrypt';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(Users) 
        private usersRepository: Repository<Users>,
    ){}

    async validateUser(email: string, password: string){
        
        const user = await this.usersRepository.findOne({
            where: { email }
        });
        
        console.log(email, password, user);

        if(!user){
            return null;
        }
        const result = await bcrypt.compare(password, user.password);
        if(result){
            const {password, ...userWithoutPassword} = user;
            return userWithoutPassword
        }

        return null;
    }
}