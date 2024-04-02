import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('CHANNEL')
@Controller('api/workspaces/:url/channels')
export class ChannelsController {

    @Get()
    getAllChannels() {

    }

    @Post()
    createChannel() {

    }

    @Get(':name')
    getOneChannel() {

    }

     // 쿼리스트링, param 전체를 받아오는 방법
     @Get(':name/chats')
     getChat(@Query() query, @Param() param){
         console.log(query.perPage, query.page);
         console.log(param.id, param.url);
     }
 
     // 각각의 쿼리스트링을 받아오는 방법 
     // @Get(':id/chats')
     // getChat(@Query('perPage') perPage, @Query('page') page, @Param('id') id, @Param('url') url){
     //     console.log(perPage, page);
     //     console.log(id, url);
     // }
 
     @Post(':name/chats')
     postChat(@Body() body) {
         
     }

     @Get(':name/members')
     getAllMembers(){

     }

     @Post(':name/members')
     inviteMembers(){

     }
}
