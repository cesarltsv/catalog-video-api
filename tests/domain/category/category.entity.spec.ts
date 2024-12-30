import { Uuid } from "../../../src/shared/domain/uuid/uuid.vo"
import { DataExceptionError } from "../../../src/domain/Exceptions/data/data-exception-error"
import { Category } from "../../../src/domain/category/category.entity"

describe("Domain - Category UnitTest", () => {
    describe("constructor()", () => {
        test("Should create a category when provide just name", () => {
            const input = {
                name: "Movie",
            }
            const category = new Category(input)
            expect(category.categoryId).toBeInstanceOf(Uuid);
            expect(category.name).toEqual(input.name);
            expect(category.description).toBeNull();
            expect(category.isActive).toBeTruthy();
            expect(category.createdAt).toBeInstanceOf(Date);
        })

        test("Should create a category when provide just name and description", () => {
            const input = {
                name: "Movie",
                description: "A description",
            }
            const category = new Category(input)
            expect(category.categoryId).toBeInstanceOf(Uuid);
            expect(category.name).toEqual(input.name);
            expect(category.description).toEqual(input.description);
            expect(category.isActive).toBeTruthy();
            expect(category.createdAt).toBeInstanceOf(Date);
        })

        test("Should create a category when provide all data", () => {
            const input = {
                name: "Movie",
                description: "A description",
                isActive: false
            }
            const category = new Category(input)
            expect(category.categoryId).toBeInstanceOf(Uuid);
            expect(category.name).toEqual(input.name);
            expect(category.description).toEqual(input.description);
            expect(category.isActive).toBe(input.isActive);
            expect(category.createdAt).toBeInstanceOf(Date);
        })

        
    })

    describe("Create()", () => {
        test("Should create a category when provide just name", () => {
            const input = {
                name: "Movie",
            }
            const category = Category.create(input)
            expect(category.categoryId).toBeInstanceOf(Uuid);
            expect(category.name).toEqual(input.name);
            expect(category.description).toBeNull();
            expect(category.isActive).toBeTruthy();
            expect(category.createdAt).toBeInstanceOf(Date);
        })

        test("Should create a category when provide just name and description", () => {
            const input = {
                name: "Movie",
                description: "A description",
            }
            const category = Category.create(input)
            expect(category.categoryId).toBeInstanceOf(Uuid);
            expect(category.name).toEqual(input.name);
            expect(category.description).toEqual(input.description);
            expect(category.isActive).toBeTruthy();
            expect(category.createdAt).toBeInstanceOf(Date);
        })

        test("Should create a category when provide all data", () => {
            const input = {
                name: "Movie",
                description: "A description",
                isActive: false
            }
            const category = Category.create(input)
            expect(category.categoryId).toBeInstanceOf(Uuid);
            expect(category.name).toEqual(input.name);
            expect(category.description).toEqual(input.description);
            expect(category.isActive).toBe(input.isActive);
            expect(category.createdAt).toBeInstanceOf(Date);
        })

        test("Should throw error when name is to short", () => {
            const input = {
                name: "Mo",
            }
            const category = () => Category.create(input)
            expect(category).toThrow(new DataExceptionError("name should has minimum of 5 character long."))
        })

        
        const arrange = [
            {id: null}, {id: undefined}, {id: new Uuid()}
        ]
        test.each(arrange)("should create a valid Uuid when id = %j", ({ id }) => {
            const input = {
                name: "Movie",
                description: "A description",
                isActive: false,
                categoryId: id
            }
            const category = Category.create(input)
            expect(category.categoryId).toBeInstanceOf(Uuid);
            expect(category.name).toEqual(input.name);
            expect(category.description).toEqual(input.description);
            expect(category.isActive).toBe(input.isActive);
            expect(category.createdAt).toBeInstanceOf(Date);
            if(input.categoryId instanceof Uuid) {
                expect(category.categoryId).toEqual(input.categoryId);
            }
        })
    })

    describe("changeName()", () => {
        test("Should change name when provided a new one", () => {
            const input = {
                name: "John"
            }
            const category = Category.create(input);
            const newName =  "agatha" 
            category.changeName(newName);
            expect(category.name).toBe(newName);
        })

        test("Should not be the old name when change it", () => {
            const input = {
                name: "John"
            }
            const category = Category.create(input);
            const newName =  "agatha" 
            category.changeName(newName);
            expect(category.name).not.toBe(input.name);
        })
    })

    describe("changeDescription()", () => {
        test("Should change Description when provided a new one", () => {
            const input = {
                name: "John",
                description: "a description"
            }
            const category = Category.create(input);
            const newDescription =  "A new Description" 
            category.changeDescription(newDescription);
            expect(category.description).toBe(newDescription);
        })

        test("Should not be the old Description when change it", () => {
            const input = {
                name: "John",
                description: "a description"
            }
            const category = Category.create(input);
            const newDescription =  "A new Description" 
            category.changeDescription(newDescription);
            expect(category.description).not.toBe(input.description);
        })
    })

    describe("ChangeIsActive()", () => {
        test("Should change isActive to true", () => {
            const input = {
                name: "John",
                description: "a description",
                isActive: false
            }
            const category = Category.create(input);
            category.activate();
            expect(category.isActive).toBeTruthy();
        })

        test("Should change isActive to false", () => {
            const input = {
                name: "John",
                description: "a description",
                isActive: true
            }
            const category = Category.create(input);
            category.deactivate();
            expect(category.isActive).toBeFalsy();
        })
    })

    describe("toJson()", () => {
        test("Should return a object", () => {
            const input = {
                name: "John",
                description: "a description",
                isActive: false,
                createdAt: new Date()
            }
            const category = Category.create(input);
            const json = category.toJson();
            expect(json.categoryId).toBe(category.categoryId.id);
            expect(json.name).toBe(input.name);
            expect(json.createdAt).toBe(input.createdAt);
            expect(json.isActive).toBe(input.isActive);
            expect(json.description).toBe(input.description);
        })

    })
})