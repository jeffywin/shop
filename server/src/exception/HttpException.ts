class HttpException extends Error {
    constructor(public status: number, public messages: string, public errors: any = {}) {
        super(messages) // 传给Error
    }
}
export default HttpException;
