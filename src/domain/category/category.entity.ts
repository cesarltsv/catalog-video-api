import { ValidateRules } from "../../shared/domain/validators/validator-rules";
import { Uuid } from "../../shared/domain/uuid/uuid.vo";

export type CategoryConstructorProps= {
    categoryId?: Uuid;
    name: string;
    description?: string | null;
    isActive?: boolean;
    createdAt?: Date;
}

export type CategoryCreateCommand = {
    name: string;
    description?: string;
    isActive?: boolean
}

export class Category {
    categoryId: Uuid;
    name: string;
    description: string | null;
    isActive: boolean;
    createdAt: Date;

    constructor(props: CategoryConstructorProps) {
        this.categoryId = props.categoryId ?? new Uuid();
        this.name = props.name;
        this.description = props.description ?? null;
        this.isActive = props.isActive ?? true;
        this.createdAt = props.createdAt ?? new Date();
        Category.validate(this)
    }

    static create(props: CategoryCreateCommand) {
        var category = new Category(props);
        Category.validate(category)
        return category;
    }

    static validate(category: Category) {
        ValidateRules.minLength(category.name, "name");
        ValidateRules.maxLength(category.name, "name", 255);
        if(category.description){
            ValidateRules.maxLength(category.description, "description", 10000);
        }
        ValidateRules.emptyOrNull<Date>(category.createdAt, "createAt");
    }

    changeName(name: string): void {
        this.name = name;
        Category.validate(this)
    }

    changeDescription(description: string): void {
        this.description = description;
        Category.validate(this)
    }

    activate() {
        this.isActive = true;
        Category.validate(this)
    }

    deactivate() {
        this.isActive = false;
        Category.validate(this)
    }

    toJson(){
        return {
            categoryId: this.categoryId.id,
            name: this.name,
            description: this.description,
            isActive: this.isActive,
            createdAt: this.createdAt,
        }
    }
}