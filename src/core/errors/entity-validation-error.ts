import { FieldsErrors } from "../validators/validator.field-interface";

export class EntityValidationError extends Error {
  constructor(public error:FieldsErrors, message?: string) {
    super(message||'Validation error.');
    this.name = 'EntityValidationError';
  }

  count(){
    return Object.keys(this.error).length
  }
}