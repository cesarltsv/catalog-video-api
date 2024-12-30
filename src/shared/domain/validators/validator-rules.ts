import { DataExceptionError } from "../../../domain/Exceptions/data/data-exception-error";

export class ValidateRules {
    public static shouldBeSmallerThen255(value: string, fieldName: string) {
        if(value.length > 255) {
            throw new DataExceptionError(`${fieldName} should not has more than 255.`)
        }
    }

    public static shouldHasMinimumSize(value: string, fieldName: string) {
        if(value.length < 3) {
            throw new DataExceptionError(`${fieldName} should has minimum of 5 character long.`)
        }
    }
}