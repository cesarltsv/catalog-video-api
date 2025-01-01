import { Uuid } from "../../shared/domain/uuid/uuid.vo";
import { Category } from "../category/category.entity";
import { IRepository } from "./repository";

export interface ICategoryRepository extends IRepository<Category, Uuid> {

}