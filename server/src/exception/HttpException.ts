class HttpException extends Error {
    constructor(public status: number, public messages: string, public errors: any = {}) {
        super(messages) // 传给Error
        // super是父类的构造函数, Error.prototype.constructor.call(this, props)
    }
}
export default HttpException;
