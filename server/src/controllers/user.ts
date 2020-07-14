import {Request, Response, NextFunction} from 'express';
import {User, UserDocument} from '../models';
import HttpException from '../exception/HttpException';
import {validateRegisterInput} from '../utils/validator';
import {UNPROCESSABLE_ENTITY} from 'http-status-codes';

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
        res.json({
            success: true,
            data: user
        })
    } catch (error) {
        next(error)
    }
   
}

