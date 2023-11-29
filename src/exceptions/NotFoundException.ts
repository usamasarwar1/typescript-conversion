export class NotFoundException extends Error {
    constructor(id: string, type: string) {
        const message = `Resource with ID '${id}' of type '${type}' not found`;
        super(message);
        this.name = 'NotFoundException';
    }
}

