import express, {Express, Request, Response, NextFunction} from 'express';
// import mongoose from 'mongoose';
import errorMiddleware from './errorMiddleware/errorMiddleware';
import HttpException from './exception/HttpException';
import cors from 'cors';
import path from 'path';
import helmet from 'helmet';
import 'dotenv/config';
import morgan from 'morgan';
import { urlencoded } from 'body-parser';
import * as userController from './controllers/user';
const app: Express = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));
app.use(urlencoded({extended: true}));

app.get('/', (_req, res, _next) => {
    res.json({
        success: true,
        data: 'hello jeffywin'
    })
});

app.post('/user/register', userController.register)
app.use((_req: Request, _res: Response, next: NextFunction) => {
    const error = new HttpException(404, '没有匹配到对应路由');
    next(error);
});
// 错误处理中间件
app.use(errorMiddleware);

(async function(){
    const PORT = process.env.PORT;
    app.listen(PORT, () => {
        console.log('running in http:// localhost: 8001')
    })
})()
