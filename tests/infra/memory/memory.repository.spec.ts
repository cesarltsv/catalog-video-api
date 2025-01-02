import { NotFoundError } from "../../../src/shared/domain/ErrorHandlers/notFoundError";
import { MemoryRepository } from "../../../src/infra/memory/memory.repository";
import { Uuid } from "../../../src/shared/domain/uuid/uuid.vo";
import { Entity } from "../../../src/shared/domain/values-object/entity";
import { ValueObject } from "../../../src/shared/domain/values-object/values-object";

type props = {
    name: string, price: number, id?: Uuid
}

class StubEntity extends Entity {
    name: string;
    price: number;
    id: Uuid;

    constructor(props: props) {
        super();
        this.id = props.id ?? new Uuid()
        this.name = props.name;
        this.price = props.price;
        console.log(props.id)
        
    }

    get getId(): ValueObject {
        return this.id;
    }
    toJson() {
        return {
            id: this.id,
            price: this.price,
            name: this.name
        }
    }

}

class StubMemoryRepository extends MemoryRepository<StubEntity, Uuid> {
    getEntity(): new (...args: any[]) => StubEntity {
        return StubEntity;
    }

}

describe("Domain  - MemoryRepository", () => {
    let repository: StubMemoryRepository;
    
    beforeEach(() => {
        repository = new StubMemoryRepository();
    })

    describe("insert()", () => {
        it("Should insert a entity", async () => {
            const entity = new StubEntity({ name: "name", price: 12.22});
            
            await repository.insert(entity);

            expect(repository.items.length).toBe(1);
            expect(repository.items[0]).toBeInstanceOf(Entity);
            expect(repository.items[0].getId).toEqual(entity.getId);
            expect(repository.items[0].name).toEqual(entity.name);
            expect(repository.items[0].price).toEqual(entity.price);
        });

        it("Should insert more then one entity repository", async () => {
            const myEntities = [
                new StubEntity({ name: "name", price: 12.22}),
                new StubEntity({ name: "new Name", price: 23.22})
            ]
            await repository.bulkInsert(myEntities);
            expect(repository.items.length).toBe(2);
            expect(repository.items[0]).toBeInstanceOf(Entity);
            expect(repository.items[1]).toBeInstanceOf(Entity);
            expect(repository.items[0].getId).toEqual(myEntities[0].getId);
            expect(repository.items[0].name).toEqual(myEntities[0].name);
            expect(repository.items[0].price).toEqual(myEntities[0].price);
            expect(repository.items[1].getId).toEqual(myEntities[1].getId);
            expect(repository.items[1].name).toEqual(myEntities[1].name);
            expect(repository.items[1].price).toEqual(myEntities[1].price);
        });

        it("Should update entity", async () => {
            const id = new Uuid();
            const firstEntity = new StubEntity({ name: "name", price: 12.22, id: id});
            const newEntity = new StubEntity({ name: "new Name", price: 23.22, id: id});
            
            await repository.insert(firstEntity);
            expect(repository.items.length).toBe(1);
            expect(repository.items[0].getId).toBe(firstEntity.getId);
            expect(repository.items[0].name).toBe(firstEntity.name);

            await repository.update(newEntity)

            expect(repository.items.length).toBe(1);
            expect(repository.items[0].name).toBe(newEntity.name);
        });

        it("Should throw error when try update a non exist items", async () => {
            const firstEntity = new StubEntity({ name: "name", price: 12.22, id: new Uuid()});
            const newEntity = new StubEntity({ name: "new Name", price: 23.22, id: new Uuid()});
            
            await repository.insert(firstEntity);
            expect(repository.items.length).toBe(1);
            expect(repository.items[0].getId).toBe(firstEntity.getId);
            expect(repository.items[0].name).toBe(firstEntity.name);

            await expect(repository.update(newEntity)).rejects.toThrow(
                new NotFoundError(newEntity.getId, repository.getEntity())
            );
        });

        it("Should delete a item", async () => {
            const myEntities = [
                new StubEntity({ name: "name", price: 12.22}),
                new StubEntity({ name: "new Name", price: 23.22})
            ]
            const idToDelete = myEntities[0].id;
            await repository.bulkInsert(myEntities);
            expect(repository.items.length).toBe(2);
            await repository.delete(idToDelete);
            expect(repository.items.length).toBe(1);
        });

        it("Should throw error when try delete a non exist items", async () => {
            const idToDelete = new Uuid();
            const firstEntity = new StubEntity({ name: "name", price: 12.22, id: new Uuid()});
            
            await repository.insert(firstEntity);
            expect(repository.items.length).toBe(1);
            expect(repository.items[0].getId).toBe(firstEntity.getId);
            expect(repository.items[0].name).toBe(firstEntity.name);

            await expect(repository.delete(idToDelete)).rejects.toThrow(
                new NotFoundError(idToDelete, repository.getEntity())
            );
        });

        it("Should find item by id", async () => {
            const id = new Uuid();
            const myEntities = [
                new StubEntity({ name: "name", price: 12.22}),
                new StubEntity({ name: "new Name", price: 23.22, id: id}),
                new StubEntity({ name: "entity name", price: 33.22}),
            ]
            await repository.bulkInsert(myEntities);
            const item = await repository.findById(id);
            expect(repository.items.length).toBe(3);
            expect(item).toBeInstanceOf(Entity);
        });

        it("Should return null when not find item by id", async () => {
            const id = new Uuid();
            const myEntities = [
                new StubEntity({ name: "name", price: 12.22}),
                new StubEntity({ name: "new Name", price: 23.22}),
                new StubEntity({ name: "entity name", price: 33.22}),
            ]
            await repository.bulkInsert(myEntities);
            const item = await repository.findById(id);
            expect(repository.items.length).toBe(3);
            expect(item).toBeNull();
        });

        it("Should return all items", async () => {
            const myEntities = [
                new StubEntity({ name: "name", price: 12.22}),
                new StubEntity({ name: "new Name", price: 23.22}),
                new StubEntity({ name: "entity name", price: 33.22}),
            ]
            await repository.bulkInsert(myEntities);
            const items = await repository.getAll();
            expect(repository.items.length).toBe(3);
            expect(items.length).toBe(3);
        });
    })
})