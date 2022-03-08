import { HttpException, HttpStatus } from '@nestjs/common';
import { BogotaeatsError } from './interfaces/bogotaeats-error.interface';

export class NotFoundException extends HttpException {
    constructor(details: string) {
        const response: BogotaeatsError = {
            code: 'not-found-error',
            message: 'Not Found',
            details,
        };
        super(response, HttpStatus.NOT_FOUND);
    }
}