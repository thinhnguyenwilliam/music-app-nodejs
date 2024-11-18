export class HttpError extends Error {
    statusCode: number;
    originalError: any;

    constructor(message: string, statusCode: number, originalError?: any) {
        super(message);
        this.statusCode = statusCode;
        this.originalError = originalError || null;
        this.name = this.constructor.name;
    }
}
