import { Entity } from "../values-object/entity";

export class NotFoundError extends Error {
    constructor(id: any[] | any, entityClass: new (...args: any[]) => Entity) {
        const idMessage = Array.isArray(id) ? id.join(", ") : id;
        super(`${entityClass.name} not found using Id ${idMessage}`)
        this.name = "NotFoundError"
    }
}