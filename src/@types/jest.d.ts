import { FieldsErrors } from "../core/validators/validator.field-interface";

declare global {
  namespace jest {
    interface Matchers<R> {
        containsErrorMessages: (expected: FieldsErrors) => R;
    }
  }
}