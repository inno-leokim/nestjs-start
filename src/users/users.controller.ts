import { Body, Controller, Get, Post, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.response.dto';
import { User } from 'src/common/decorators/user.decorator';
import { UndefinedToNullInterceptor } from 'src/common/interceptors/undefinedToNull.interceptor';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';

@UseInterceptors(UndefinedToNullInterceptor)
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
    // getUsers(@Req() req){
    getUsers(@User() user) { //커스텀 데코레이션 사용
        // return req.user; //회원정보를 반환하기 때문에 UserDto를 사용한다.
        return user;  //커스텀 데코레이션을 생성 및 사용하여 req.user가 아닌 user를 사용하였다.
    }
    
    @ApiOperation({summary: '회원가입'}) // swagger에서 출력할 API 정보
    @Post()
    async join(@Body() data: JoinRequestDto){
        await this.usersService.postUsers(data.email, data.nickname, data.password); //eceptionfilter 사용을 위해 await을 반드시 붙여야한다.
    }
    
    @ApiResponse({
        type: UserDto,
        status: 200,
        description: '성공'
    })
    @ApiOperation({summary: '로그인'})
    @UseGuards(LocalAuthGuard)
    @Post('login')
    // login(@Req() req) {
    login(@User() user) { //커스텀 데코레이션 사용
        // return req.user; //회원정보를 반환하기 때문에 UserDto를 사용한다.
        return user; //커스텀 데코레이션을 생성 및 사용하여 req.user가 아닌 user를 사용하였다.
    }

    @ApiOperation({summary: '로그아웃'})
    @Post('logout')
    logout(@Req() req, @Res() res){ // @Req, @Res 같이 express와 연결된 기능을 쓰지 않는게 좋지만, logout은 써야되는 듯...
        req.logout();
        res.clearCookie('connect.sid', {httpOnly: true});
        res.send('ok')
    }
}
