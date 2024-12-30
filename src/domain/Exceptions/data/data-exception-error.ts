export class DataExceptionError extends Error {
    constructor(message?: string, nameField?: string){
        super(message || `${nameField} must be a valid`);
        this.name = this.constructor.name;
    }
}