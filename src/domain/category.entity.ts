import { Uuid } from "../core/domain/uuid.vo";

export interface CategoryConstructorProps{
  categoryId?: Uuid;
  name: string;
  description?: string|null;
  isActive?: boolean;
  createdAt?: Date;

}

export interface CategoryCreateCommand extends Omit<CategoryConstructorProps, 'categoryId'| 'createdAt'>{}

export class Category{
  categoryId: Uuid ;
  name: string;
  description: string|null;
  isActive: boolean;
  createdAt: Date;

  private constructor(props:CategoryConstructorProps){
    this.categoryId=props.categoryId|| Uuid.create();
    this.name=props.name;
    this.description=props.description??null;
    this.isActive=props.isActive?? true;
    this.createdAt=props.createdAt?? new Date();
  }

  static create(props:CategoryCreateCommand):Category{
    return new Category(props)
  }
  static restore(props:CategoryConstructorProps):Category{
    return new Category(props)
  }

  changeName(name:string){
    this.name=name;
  }

  changeDescription(description:string){
    this.description=description;
  }

  activate(){
    this.isActive=true;
  }

  deactivate(){
    this.isActive=false;
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