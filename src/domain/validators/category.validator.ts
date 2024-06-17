import { IsBoolean, isNotEmpty, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator"
import { Category } from "../category.entity"
import { ClassValidatorFields } from "../../core/validators/class-validator-fields"

class CategoryRules{
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name:string

  @IsString()
  @IsOptional()
  description:string|null

  @IsBoolean()
  @IsNotEmpty()
  isActive:boolean

  constructor({name,description,isActive}:Category){
    Object.assign(this,{name,description,isActive})
  }
}

export class CategoryValidator extends ClassValidatorFields<CategoryRules>{ 
  validate(entity:Category){
   return super.validate(new CategoryRules(entity))
  }

}