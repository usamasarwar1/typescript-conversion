interface AdditionalErrorInfo {
    error: string;
    path: (string | number)[];
}

export class BadRequestException extends Error {
    constructor(message: string, additionalErrorInfo?: AdditionalErrorInfo[] | Error) {
        super(message);

        // Set the name for your custom exception
        this.name = 'BadRequestException';

        // Handle the additional error info
        if (additionalErrorInfo) {
            if (Array.isArray(additionalErrorInfo)) {
                // Additional error info provided as an array
                this.additionalErrorInfoArray = additionalErrorInfo;
            } else {
                // Treat it as a plain error object
                this.originalError = additionalErrorInfo as Error;
            }
        }

        // Ensure the stack trace is captured appropriately
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, BadRequestException);
        }
    }

    // Property to store an array of additional error info
    additionalErrorInfoArray?: AdditionalErrorInfo[];
    originalError?: Error;
}
