import { validateSync } from "class-validator";
import { FieldsErrors, IValidatorFields } from "./validator.field-interface";

export abstract class ClassValidatorFields<PropsValidate> implements IValidatorFields<PropsValidate> {
  erros: FieldsErrors|null = null;
  validateData: PropsValidate|null = null;
  validate(data: any): boolean {
    const erros =validateSync(data)
    if(erros.length){
      this.erros = {}
      erros.forEach(({property,constraints})=>{
        this.erros[property] = Object.values(constraints)
      })
      return false
    }else{
      this.validateData=data
    }

    return !erros.length
  }
}