import mogoose, { Schema, Model, Document} from 'mongoose';
import validator from 'validator';

export interface UserDocument extends Document {
    username: String,
    password: String,
    avatar: String,
    email: String
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

export const User: Model<UserDocument> = mogoose.model<UserDocument>('user', UserSchema);
// new User().password 可以点出来 