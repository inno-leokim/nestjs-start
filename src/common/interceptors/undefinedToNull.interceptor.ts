import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";


@Injectable()
export class UndefinedToNullInterceptor implements NestInterceptor {
    
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        
        // 만약 data === user 일 경우 {data: user}가 되는 것.
        // return next.handle().pipe(map((data)=>({data, code: 'SUCCESS'}))); //data는 컨트롤러에서 리턴해주는 data
        return next.handle().pipe(map((data)=> data === undefined ? null : data)); //data는 컨트롤러에서 리턴해주는 data
    }

}

// pipe(catchError) 등을 사용해서 error 핸들링을 AOP에서 할 수 있으나, exception filter 기능을 사용하여 에러핸들링을 하느 것이 더 낫다.