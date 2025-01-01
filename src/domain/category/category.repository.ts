import { Category } from './category.entity';
export interface ICategoryRepository {
    insert(category: Category): void;
}