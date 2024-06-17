import { Uuid } from "../../core/domain/uuid.vo"
import { EntityValidationError } from "../../core/errors/entity-validation-error"
import { Category } from "../category.entity"

describe('Category Entity Unit Tests', () => {
  let validateSpy: jest.SpyInstance
  beforeEach(() => {
    validateSpy = jest.spyOn(Category, 'validate')
  })

  describe('Error cases', () => {
    it('Deve retornar um erro caso o nome seja inválido', () => {
      expect((() => Category.create({ name: null }))).containsErrorMessages({
        name: ['name should not be empty' ,"name must be a string" ,"name must be shorter than or equal to 255 characters"],
      })

      expect((() => Category.create({ name: '' }))).containsErrorMessages({
        name: ['name should not be empty' ],
      })

      expect((() => Category.create({ name: 'a'.repeat(256) }))).containsErrorMessages({
        name: ['name must be shorter than or equal to 255 characters' ],
      })

      expect((() => Category.create({ name: 5 as any }))).containsErrorMessages({
        name: ["name must be a string",'name must be shorter than or equal to 255 characters' ],
      })
      
    })

    it('Deve retornar um erro caso a descrição seja inválida', () => {
      expect((() => Category.create({ name: 'Category 1', description: 5 as any }))).containsErrorMessages({
        description: ["description must be a string"],
      })
    })

    it('Deve retornar um erro caso isActive seja inválido', () => {
      expect((() => Category.create({ name: 'Category 1', isActive: null }))).containsErrorMessages({
        isActive: ['isActive should not be empty' ,"isActive must be a boolean value"],
      })

      expect((() => Category.create({ name: 'Category 1', isActive: 5 as any }))).containsErrorMessages({
        isActive: ["isActive must be a boolean value"],
      })
    })

    it("Deve retornar um erro no changeName caso o nome seja inválido", () => {
      expect((() => Category.restore({ name: 'Category 1' }).changeName(null))).containsErrorMessages({
        name: ['name should not be empty' ,"name must be a string" ,"name must be shorter than or equal to 255 characters"],
      
      })
    })

    it("Deve retornar um erro no changeDescription caso a descrição seja inválida", () => {
      expect((() => Category.restore({ name: 'Category 1' }).changeDescription(5 as any))).containsErrorMessages({
        description: ["description must be a string"],
      })
    })

    it("Deve retornar um erro no activate caso isActive seja inválido", () => {
      expect((() => Category.restore({ name: 'Category 1' }).activate())).containsErrorMessages({
        isActive: ['isActive must be a boolean value'],
      })
    })

    it("Deve retornar um erro no deactivate caso isActive seja inválido", () => {
      expect((() => Category.restore({ name: 'Category 1' }).deactivate())).containsErrorMessages({
        isActive: ['isActive must be a boolean value'],
      })
    })
  })

  describe("Success cases", () => {

  it('Criar um categoria', () => {
    let category= Category.create({
      name: 'Category 1',
     })

     expect(category).toBeInstanceOf(Category)
     expect(category.categoryId).toBeInstanceOf(Uuid)
     expect(category.name).toBe('Category 1')
     expect(category.description).toBeNull()
     expect(category.isActive).toBe(true)
     expect(category.createdAt).toBeInstanceOf(Date)

     category= Category.create({
        name: 'Category 2',
        description: 'Category description',
        isActive: false
     })

     expect(category).toBeInstanceOf(Category)
     expect(category.categoryId).toBeInstanceOf(Uuid)
     expect(category.name).toBe('Category 2')
     expect(category.description).toBe('Category description')
     expect(category.isActive).toBe(false)
     expect(category.createdAt).toBeInstanceOf(Date)
     expect(validateSpy).toHaveBeenCalledTimes(2)
  })

  it('Restore a category', () => {

    const categoryId= Uuid.create()
    let category= Category.restore({    
      categoryId,
      name: 'Category 1',
      description: 'Category description',
      isActive: false,
      createdAt: new Date()
    })

    expect(category).toBeInstanceOf(Category)
    expect(category.categoryId).toBe(categoryId)
    expect(category.name).toBe('Category 1')
    expect(category.description).toBe('Category description')
    expect(category.isActive).toBe(false)
    expect(category.createdAt).toBeInstanceOf(Date)

  })

  it('Change name of category', () => {
    const categoryId= Uuid.create()
    const  category= Category.restore({
      categoryId,
      name: 'Category 1',
      description: 'Category description',
      isActive: false,
    })
    expect(category.name).toBe('Category 1')

    category.changeName('Category 2')

    expect(category.name).toBe('Category 2')
    expect(validateSpy).toHaveBeenCalledTimes(1)

  })

  it('Change description of category', () => {
    const categoryId= Uuid.create()

    const  category= Category.restore({
      categoryId,
      name: 'Category 1',
      description: 'Category description',
      isActive: false,
      
    })
    expect(category.description).toBe('Category description')

    category.changeDescription('Category description 2')

    expect(category.description).toBe('Category description 2')
    expect(validateSpy).toHaveBeenCalledTimes(1)

  })


  it('Activate a category', () => {
    const categoryId= Uuid.create()
    const  category= Category.restore({
      categoryId,
      name: 'Category 1',
      description: 'Category description',
      isActive: false,
    })
    expect(category.isActive).toBe(false)

    category.activate()

    expect(category.isActive).toBe(true)
  })

  it('Deactivate a category', () => {
    const categoryId= Uuid.create()
    const  category= Category.restore({
      categoryId,
      name: 'Category 1',
      description: 'Category description',
      isActive: true,
    })
    expect(category.isActive).toBe(true)

    category.deactivate()

    expect(category.isActive).toBe(false)
  })


  it('Convert category to JSON', () => {
    const categoryId= Uuid.create()
    const  category= Category.restore({
      categoryId,
      name: 'Category 1',
      description: 'Category description',
      isActive: true,
      createdAt: new Date()
    })

    const json= category.toJSON()

    expect(json.categoryId).toBe(categoryId.id)
    expect(json.name).toBe('Category 1')
    expect(json.description).toBe('Category description')
    expect(json.isActive).toBe(true)
    expect(json.createdAt).toBeInstanceOf(Date)
  })

})
})