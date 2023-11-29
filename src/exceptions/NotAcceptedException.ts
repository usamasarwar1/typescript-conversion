export class NotAcceptedException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'NotAcceptedException';
    }
}
