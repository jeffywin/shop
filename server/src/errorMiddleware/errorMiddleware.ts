import HttpException from '../exception/HttpException';
import { Request, Response, NextFunction} from 'express';
import { INTERNAL_SERVER_ERROR } from 'http-status-codes';
// 拿到外面传过来的error，再返回给页面
const errorMiddleware = (error: HttpException, _request: Request, response: Response, _next: NextFunction) => {
    response.status(error.status | INTERNAL_SERVER_ERROR).send({
        success: false,
        message: error.message,
        errors: error.errors
    })
}

export default errorMiddleware;
