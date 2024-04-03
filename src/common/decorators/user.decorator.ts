import { ExecutionContext, createParamDecorator } from "@nestjs/common";

//커스텀 decorator. user 컨트롤러에서 사용할 데코레이터를 작성해 본다.

export const User = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.user;
    },
)