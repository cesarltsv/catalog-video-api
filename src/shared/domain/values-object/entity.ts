import { ValueObject } from "./values-object";

export abstract class Entity {
    abstract get getId(): ValueObject;
    abstract toJson(): any;
}