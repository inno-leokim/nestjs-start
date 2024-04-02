import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.response.dto';

@ApiTags('User')
@Controller('api/users')
export class UsersController {

    constructor(private readonly usersService: UsersService){

    }

    @ApiResponse({
        type: UserDto,
        status: 200,
        description: '성공'
    })
    @ApiResponse({
        status: 500,
        description: '서버 에러'
    })
    @ApiOperation({summary: '내 정보 조회'})
    @Get()
    getUsers(@Req() req){
        return req.user; //회원정보를 반환하기 때문에 UserDto를 사용한다.
    }
    
    @ApiOperation({summary: '회원가입'}) // swagger에서 출력할 API 정보
    @Post()
    join(@Body() data: JoinRequestDto){
        this.usersService.postUsers(data.email, data.nickname, data.password);
    }
    
    @ApiResponse({
        type: UserDto,
        status: 200,
        description: '성공'
    })
    @ApiOperation({summary: '로그인'})
    @Post('login')
    login(@Req() req) {
        return req.user; //회원정보를 반환하기 때문에 UserDto를 사용한다.
    }

    @ApiOperation({summary: '로그아웃'})
    @Post('logout')
    logout(@Req() req, @Res() res){ // @Req, @Res 같이 express와 연결된 기능을 쓰지 않는게 좋지만, logout은 써야되는 듯...
        req.logout();
        res.clearCookie('connect.sid', {httpOnly: true});
        res.send('ok')
    }
}
