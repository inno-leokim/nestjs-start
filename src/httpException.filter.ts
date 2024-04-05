import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response } from "express";


@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
       
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();   
        const err = exception.getResponse() as 
            | { message: any;  statusCode: number }
            | { error: string; statusCode: 400; message: string[] };

        if (typeof err !== 'string' && err.statusCode === 400) {
            // class-validator 에러
            return response.status(status).json({
                success: false,
                code: status,
                data: err.message,
            });
        }

        response.status(status).json({
            success: false,
            code: status,
            data: err.message,
        })
        
    }  

}