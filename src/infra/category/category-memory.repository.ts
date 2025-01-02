import { Category } from "../../domain/category/category.entity";
import { Uuid } from "../../shared/domain/uuid/uuid.vo";
import { MemoryRepository } from "../memory/memory.repository";

export class CategoryMemoryRepository extends MemoryRepository<Category, Uuid> {
    getEntity(): new (...args: any[]) => Category {
        return Category;
    }

}