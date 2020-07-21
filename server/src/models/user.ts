import mogoose, { Schema, Model, Document, HookNextFunction} from 'mongoose';
import validator from 'validator';
import bcrtptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserPayload } from '../typing/jwt';
export interface UserDocument extends Document {
    username: string,
    password: string,
    avatar: string,
    email: string,
    generateToken: () => string
}
const UserSchema: Schema<UserDocument> = new Schema({
    username: {
        type: String,
        required: [true, '用户名不能为空'],
        minlength: [6, '最小长度不能为6'],
        maxlength: [12, '最大长度不能超过12']

    },
    password: String,
    avatar: String,
    email: {
        type: String,
        validate: {
            validator: validator.isEmail
        },
        trim: true
    }
}, {timestamps: true}) // 使用时间戳，自动添加两个字段 createdAt updatedAt
// 每次保存文档之前对密码加密操作
UserSchema.pre<UserDocument>('save', async function(next: HookNextFunction) {
    // 如果密码没改过
    if (!this.isModified('password')) {
        next()
    }
    try {
        this.password = await bcrtptjs.hash(this.password, 10);
        next()
    } catch (error) {
        next(error)
    }
})

// 给User的实例user扩展一个generaToken 方法
UserSchema.methods.generateToken = function(): string {
    let payload: UserPayload = ({id: this._id});
    return jwt.sign(payload, process.env.JWT_SECRET_KEY || 'jeffywin', {expiresIn: '1h'})
}   

// 给User模型扩展一个login方法
UserSchema.static('login', async function(this: any, username: string, password: string): Promise<UserDocument | null> {
    let user: UserDocument | null = await this.model('User').findOne({username});
    if (user) {
        const matched = await bcrtptjs.compare(password, user.password);
        if (matched) {
            return user;
        } else {
            return null;
        }
    } else {
        return null
    }
})
export interface UserModel<T extends Document> extends Model<T> {
    login: (username: string, password: string) => UserDocument | null
}
export const User: UserModel<UserDocument> = mogoose.model<UserDocument, UserModel<UserDocument>>('User', UserSchema);
// new User().password 可以点出来 