export class NotValidException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'NotValidException';
    }
}