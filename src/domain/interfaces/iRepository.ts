import { Entity } from "../../shared/domain/values-object/entity";
import { ValueObject } from "../../shared/domain/values-object/values-object";

export interface IRepository<E extends Entity, EntityId extends ValueObject> {
    insert(entity: E): Promise<void>;
    bulkInsert(entities: E[]): Promise<void>;
    update(entity: E): Promise<void>;
    delete(entityId: EntityId): Promise<void>;
    findById(entityId: EntityId): Promise<E | null>;
    getAll(): Promise<E[]>;
    getEntity(): new (...args: any[]) => E;
}