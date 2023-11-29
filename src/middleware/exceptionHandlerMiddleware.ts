import { Request, Response, NextFunction } from 'express';
import { NotFoundException, BadRequestException, NotAcceptedException, NotValidException } from '../exceptions';
interface ErrorObject {
    status: number;
    messages: string;
    type: string;
    additionalErrorInfo?: { error: string; path: (string | number)[] }[];
    originalError?: {
        message: string;
    };
}

export const exceptionHandlerMiddleware = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (error instanceof NotFoundException || error instanceof NotValidException) {
        return res.status(404).json({
            status: 404,
            messages: error.message,
            type: "Error"
        });
    }
    if (error instanceof NotAcceptedException) {
        return res.status(406).json({
            status: 406,
            messages: error.message,
            type: "Error"
        });
    }
    if (error instanceof BadRequestException) {

        let errorObj: ErrorObject = {
            status: 400,
            messages: error.message,
            type: "Error"
        };

        if (error.additionalErrorInfoArray)
            errorObj.additionalErrorInfo = error.additionalErrorInfoArray;

        if (error.originalError)
            errorObj.originalError = { message: error.originalError.message, /* other properties if needed */ };

        return res.status(400).json(errorObj);
    }

    // For unhandled exceptions
    return res.status(500).json({
        status: 500,
        messages: 'Internal Server Error',
        type: "Error"
    });
};
