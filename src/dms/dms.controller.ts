import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('DM') //swagger에서 그룹별로 묶어준다.
@Controller('api/workspaces/:url/dms')
export class DmsController {

    // 쿼리스트링, param 전체를 받아오는 방법
    @ApiParam
    ({
        name: 'url',
        required: true,
        description: '워크스페이스 url'
    })
    @ApiParam({
        name: 'id',
        required: true,
        description: '사용자 아이디'
    })
    @ApiQuery({
        name: 'perPage',
        required: true,
        description: '한 번에 가져오는 개수',
    })
    @ApiQuery({
        name: 'page',
        required: true,
        description: '불러올 페이지',
    })
    @Get(':id/chats')
    getChat(@Query() query, @Param() param){
        console.log(query.perPage, query.page);
        console.log(param.id, param.url);
    }
    
    // 각각의 쿼리스트링을 받아오는 방법 
    // @ApiQuery({
    //     name: 'perPage',
    //     required: true,
    //     description: '한 번에 가져오는 개수',
    // })
    // @Get(':id/chats')
    // getChat(@Query('perPage') perPage, @Query('page') page, @Param('id') id, @Param('url') url){
    //     console.log(perPage, page);
    //     console.log(id, url);
    // }

    @Post(':id/chats')
    postChat(@Body() body) {

    }
}
