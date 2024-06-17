export type FieldsErrors = { [field: string]: string[] };


export interface IValidatorFields<PropsValidate>{
  erros:FieldsErrors|null
  validateData:PropsValidate|null
  validate(data:any):boolean
}