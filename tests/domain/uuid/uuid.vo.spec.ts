import { validate as uuidValidate } from "uuid";
import { invalidUuidError, Uuid } from "../../../src/shared/domain/uuid/uuid.vo";

describe("Domain - Uuid UnitTest", () => {

    const validateSpy = jest.spyOn(Uuid.prototype as any, "validate");

    describe("ValueObject", () => {
        test("Should  throw error when uuid is invalid", () => {
            const result = () => new Uuid("231");
            expect(result).toThrow(new invalidUuidError());
            expect(validateSpy).toHaveBeenCalled();
        })
    
        test("Should create a uuid when not provided", () => {
            const result = new Uuid();
            expect(result.id).toBeDefined();
            expect(uuidValidate(result.id)).toBeTruthy();
            expect(validateSpy).toHaveBeenCalled();
        })

        test("Should create a uuid when provided", () => {
            const uuid = "0899d2a1-fde5-472a-9a21-c5826dc4f081";
            const result = new Uuid(uuid);
            expect(result.id).toBe(uuid);
            expect(validateSpy).toHaveBeenCalled();
        })
    })
})