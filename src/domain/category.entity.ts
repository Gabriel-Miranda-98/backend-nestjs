import { Entity } from "../core/domain/entity";
import { Uuid } from "../core/domain/uuid.vo";
import { ValueObject } from "../core/domain/value-object";
import { EntityValidationError } from "../core/errors/entity-validation-error";
import { CategoryValidatorFactory } from "./validators/category.validator";

export interface CategoryConstructorProps{
  categoryId?: Uuid;
  name: string;
  description?: string|null;
  isActive?: boolean;
  createdAt?: Date;

}

export interface CategoryCreateCommand extends Omit<CategoryConstructorProps, 'categoryId'| 'createdAt'>{}

export class Category extends Entity{
  
  categoryId: Uuid ;
  name: string;
  description: string|null;
  isActive: boolean;
  createdAt: Date;

  private constructor(props:CategoryConstructorProps){
    super()
    this.categoryId=props.categoryId|| Uuid.create();
    this.name=props.name;
    this.description=props.description??null;
    this.isActive=props.isActive?? true;
    this.createdAt=props.createdAt?? new Date();
  }

  getEntityId(): ValueObject {
    return this.categoryId
  }

  static create(props:CategoryCreateCommand):Category{
    const category= new Category(props)
    Category.validate(category)
    return category
  }
  static restore(props:CategoryConstructorProps):Category{
    return new Category(props)
  }

  changeName(name:string){
    this.name=name;
    Category.validate(this)

  }

  changeDescription(description:string){
    this.description=description;
    Category.validate(this)

  }

  activate(){
    this.isActive=true;
  }

  deactivate(){
    this.isActive=false;
  }

  static validate(entity:Category){
    const validator = CategoryValidatorFactory.create()
    const isValid= validator.validate(entity)
    if(!isValid){
      throw new EntityValidationError(validator.erros,'Invalid category')
    }
  }



  toJSON(){
    return {
      categoryId:this.categoryId.id,
      name:this.name,
      description:this.description,
      isActive:this.isActive,
      createdAt:this.createdAt
    }
  }
}