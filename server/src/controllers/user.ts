import {Request, Response, NextFunction} from 'express';
import {User, UserDocument} from '../models';
import HttpException from '../exception/HttpException';
import {validateRegisterInput} from '../utils/validator';
import {UNPROCESSABLE_ENTITY, UNAUTHORIZED} from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { UserPayload } from 'src/typing/jwt';

export const validate = async(req: Request, res: Response, _next: NextFunction) => {
    const authorization = req.headers['authorization'];
    // Authorization    Bearer Token
    if (authorization) {
        const token = authorization.split(' ')[1];
        if (token) {
            try {
                const payload: UserPayload = jwt.verify(token, process.env.JWT_SECRET_KEY!) as UserPayload;
                const user = await User.findById(payload.id); 
                if (user) {
                    res.json({
                        success: true,
                        data: user.toJSON()
                    });
                }
            } catch (error) {
                throw new HttpException(UNAUTHORIZED, '用户不合法')
            }
        }
    } else {
        throw new HttpException(UNAUTHORIZED, 'authorization未提供')
    }
}

export const register = async(req: Request, res: Response, next: NextFunction) => {
    let {username, password, confirmPassword, email} = req.body;
    try {
        let {valid, errors} = validateRegisterInput(username, password, confirmPassword, email);
        if(!valid) {
            throw new HttpException(UNPROCESSABLE_ENTITY, '参数校验失败', errors)
        }
        let oldUser:UserDocument | null = await User.findOne({username});
        if(oldUser) {
            throw new HttpException(UNPROCESSABLE_ENTITY, '用户名重复', errors)
        }
        let user: UserDocument = new User({username, password, confirmPassword, email})
        await user.save();
        let token = user.generateToken();
        res.json({
            success: true,
            data: {token}
        })
    } catch (error) {
        next(error)
    }
   
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {username, password} = req.body;
        // 给User扩展一个login方法,在models中的user中扩展，包括登录校验功能
        let user = await User.login(username, password);
        if(user) {
            let token = user.generateToken();
            res.json({
                success: true,
                data: {token}
            })
        } else {
            throw new HttpException(UNAUTHORIZED, '登录失败')
        }
    } catch (error) {
        next(error);
    }
}

