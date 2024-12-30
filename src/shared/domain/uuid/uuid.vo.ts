import { ValueObject } from "../values-object/values-object";
import { v4 as idv4, validate as uuidValidate  } from "uuid";

export class Uuid extends ValueObject {
    public readonly id: string;
    constructor(id?: string){
        super();
        this.id = id || idv4();
        this.validate();
    }

    private validate(){
        const isValid = uuidValidate(this.id);
        if(!isValid) {
            throw new invalidUuidError();
        }
    }
}

export class invalidUuidError extends Error {
    constructor(message?: string){
        super(message || "Id must be a valid uuid");
        this.name = this.constructor.name;
    }
}