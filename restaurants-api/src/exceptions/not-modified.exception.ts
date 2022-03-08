import { HttpException, HttpStatus } from '@nestjs/common';
import { BogotaeatsError } from './interfaces/bogotaeats-error.interface';

export class NotModifiedException extends HttpException {
    constructor(details: string) {
        const response: BogotaeatsError = {
            code: 'not-modified-error',
            message: 'No modified Request',
            details,
        };
        super(response, HttpStatus.NOT_MODIFIED);
    }
}