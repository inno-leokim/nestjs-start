import { ApiProperty, PickType } from "@nestjs/swagger";
import { Users } from "src/entity/Users";

export class JoinRequestDto extends PickType(Users,['email', 'nickname', 'password'] as const){
    
    // PickType을 통해 아래 내용을 user 엔티티에서 가져오므로 직접 작성할 필요가 없다. 
    // @ApiProperty({
    //     example: 'test@abc.com',
    //     description: '이메일',
    //     required: true
    // })
    // public email: string;
    
    // @ApiProperty({
    //     example: 'crying nut',
    //     description: '닉네임',
    //     required: true
    // })
    // public nickname: string;
    
    // @ApiProperty({
    //     example: 'AaBa12k',
    //     description: '비밀번호',
    //     required: true
    // })
    // public password: string;
}