import mogoose, { Schema, Model, Document, HookNextFunction} from 'mongoose';
import validator from 'validator';
import bcrtptjs from 'bcryptjs';

export interface UserDocument extends Document {
    username: string,
    password: string,
    avatar: string,
    email: string
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
// 每次保存文档之前操作
UserSchema.pre<UserDocument>('save', async function(next: HookNextFunction) {
    // 如果密码没改过
    if (!this.isModified(this.password)) {
        next()
    }
    try {
        this.password = await bcrtptjs.hash(this.password, 10);
        next()
    } catch (error) {
        next(error)
    }
})
export const User: Model<UserDocument> = mogoose.model<UserDocument>('user', UserSchema);
// new User().password 可以点出来 