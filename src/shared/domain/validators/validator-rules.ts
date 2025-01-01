import { DataExceptionError } from "../../../domain/Exceptions/data/data-exception-error";

export class ValidateRules {
    public static maxLength(value: string, fieldName: string, length: number = 255) {
        if(value.length > length) {
            throw new DataExceptionError(`${fieldName} should not has more than ${length}.`)
        }
    }

    public static minLength(value: string, fieldName: string) {
        if(value.length < 3) {
            throw new DataExceptionError(`${fieldName} should has minimum of 5 character long.`)
        }
    }

    public static emptyOrNull<T>(value: T, fieldName: string) {
        if(value == null || value == undefined) {
            throw new DataExceptionError(`${fieldName} should not be empty or null.`)
        }
    }
}