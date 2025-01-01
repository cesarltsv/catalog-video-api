import { Uuid } from "../../shared/domain/uuid/uuid.vo";
import { Category } from "../category/category.entity";
import { IRepository } from "./iRepository";

export interface ICategoryRepository extends IRepository<Category, Uuid> {

}