import { HttpException, HttpStatus } from '@nestjs/common';
import { BogotaeatsError } from './interfaces/bogotaeats-error.interface';

export class BadRequestException extends HttpException {
    constructor(details: string) {
        const response: BogotaeatsError = {
            code: 'bad-request-error',
            message: 'Bad Request',
            details,
        };
        super(response, HttpStatus.BAD_REQUEST);
    }
}