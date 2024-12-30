import { Uuid } from "../../shared/domain/values-objects/uuid.vo";

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
    }

    static create(props: CategoryCreateCommand) {
        return new Category(props);
    }

    changeName(name: string): void {
        this.name = name;
    }

    changeDescription(description: string): void {
        this.description = description;
    }

    activate() {
        this.isActive = true;
    }

    deactivate() {
        this.isActive = false;
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