abstract class BaseError extends Error {
    abstract statusCode: number;
    constructor(public message: string = "An error occurred") {
        super();
    }
}
class NotFoundError extends BaseError {
    statusCode = 404;
    message: string;
    constructor(message: string = 'Not Found') {
        super(message);
        this.message = message;
    }
}

export {
    NotFoundError
};
