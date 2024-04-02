import { ApiProperty } from "@nestjs/swagger";

export class JoinRequestDto {
    
    @ApiProperty({
        example: 'test@abc.com',
        description: '이메일',
        required: true
    })
    public email: string;
    
    @ApiProperty({
        example: 'crying nut',
        description: '닉네임',
        required: true
    })
    public nickname: string;
    
    @ApiProperty({
        example: 'AaBa12k',
        description: '비밀번호',
        required: true
    })
    public password: string;
}