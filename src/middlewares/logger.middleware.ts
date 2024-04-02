import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

/**
 * 실무에서는 nest morgan을 사용한다.
 */

// nestJS는 console.log가 아니라 Logger를 쓴다. console.log는 추적이 쉽지 않다. 그래서 express에서는 morgan, debug 등을 썼었다.
@Injectable()
export class LoggerMiddleware implements NestMiddleware{
    
    private logger = new Logger('HTTP'); //HTTP 요청 한정.
    
    // use(req: any, res: any, next: (error?: any) => void) // express의 req, res를 사용한다. any는 자동완성 등이 되지 않는다.
    use(req: Request, res: Response, next: NextFunction) {  //express의 app.use와 같은 개념
        // 이 지점은 라우팅이 실행되기 전!
        const {ip, method, originalUrl} = req;
        const userAgent = req.get('user-agent') || '';

        res.on('finish', () => { // 이 지점은 라우터가 끝나고 실행. 그래서 finish 이벤트를 작성
            const { statusCode } = res;
            const contentLength = res.get('content-length');
            this.logger.log(`${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`)
        });

        next(); //next를 해주지 않으면 이 지점에서 pending이 되어 어플리케이션의 routing이 동작하지 않는다. 미들웨어 사용 시 항상 next를 해줘야 한다.
    }
}