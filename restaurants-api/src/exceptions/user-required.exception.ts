import { HttpException, HttpStatus } from '@nestjs/common';
import { BogotaeatsError } from './interfaces/bogotaeats-error.interface';

export class UserRequiredException extends HttpException {
    constructor(details: string) {
        const response: BogotaeatsError = {
            code: 'user-required',
            message: 'Proxy Authentication Required',
            details,
        };
        super(response, HttpStatus.PROXY_AUTHENTICATION_REQUIRED);
    }
}