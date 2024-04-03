import { ExecutionContext, createParamDecorator } from "@nestjs/common";

//커스텀 decorator. user 컨트롤러에서 사용할 데코레이터를 작성해 본다.

export const Token = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const response = ctx.switchToHttp().getResponse();
        
        return response.locals.jwt;
    },
)

// 실행 컨텍스트
// 한 서버에서 http, rpc, socket 세가지 통신을 다 할 수 있다. 
// 따라서 ctx.switchToHttp, ctx.switchToRpc, ctx.switchTows 등 하나의 실행 컨텍스트(ctx)에서 정보를 가져오는 것이 가능하다.

// 위와 같이 작성 후, 컨트롤러에서 @Token() token 식으로 커스텀 데코레이터를 사용할 수 있다.