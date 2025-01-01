import { IRepository } from "../../../domain/interfaces/iRepository";
import { Entity } from "../../domain/values-object/entity";
import { ValueObject } from "../../domain/values-object/values-object";

export abstract class MemoryRepository<E extends Entity, EntityId extends ValueObject> implements IRepository<E, EntityId> {

    items: E[] = [];

    public async insert(entity: E): Promise<void> {
        await this.items.push(entity);
    }

    public async bulkInsert(entities: E[]): Promise<void> {
        this.items.push(...entities);
    }

    public async update(entity: E): Promise<void> {
        const indexItem = this.items.findIndex(item => item.getId.equals(entity.getId));
        if(indexItem  === -1) {
            throw Error("Entity not found");
        };
        this.items[indexItem] = entity;
    }

    public async delete(entityId: EntityId): Promise<void> {
        const indexItem = this.items.findIndex(item => item.getId.equals(entityId));
        if(indexItem  === -1) {
            throw Error("Entity not found");
        };
        this.items.splice(indexItem, 1);
    }

    public async findById(entityId: EntityId): Promise<any> {
        const item = this.items.find(item => item.getId.equals(entityId));
        return typeof item === "undefined" ? null : item;
    }

    public async getAll(): Promise<any[]> {
        return this.items;
    }

    abstract getEntity(): new (...args: any[]) => E;

    protected async _get(id: EntityId) {
        const item = this.items.find(item => item.getId.equals(id));
        return typeof item === "undefined" ? null : item;
    }

}