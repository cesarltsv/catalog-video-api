import { ValueObject } from "../values-object";

class StringValueObject extends ValueObject {
    constructor(readonly value: string){
        super();
    }
}

class ComplexValueObject extends ValueObject {
    constructor(readonly prop1: string, readonly prop2: number){
        super();
    }
}

describe("Domain - ValueObject UnitTest", () => {
    describe("ValueObject", () => {
        test("Should be equal", () => {
            const firstObject = new StringValueObject("value");
            const secondObject = new StringValueObject("value");
            expect(firstObject.equals(secondObject)).toBe(true);
        })

        test("Should be equal when have more values", () => {
            const firstObject = new ComplexValueObject("value", 2);
            const secondObject = new ComplexValueObject("value", 2);
            expect(firstObject.equals(secondObject)).toBe(true);
        })

        test("Should not be equal", () => {
            const firstObject = new StringValueObject("value2");
            const secondObject = new StringValueObject("value");
            expect(firstObject.equals(secondObject)).toBe(false);
        })

        test("Should Not be equal when have more values", () => {
            const firstObject = new ComplexValueObject("value", 1);
            const secondObject = new ComplexValueObject("value", 2);
            expect(firstObject.equals(secondObject)).toBe(false);
        })
    
    })
})