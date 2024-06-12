import { Category } from "../category.entity"

describe('Category Entity Unit Tests', () => {
  it('Create a category', () => {
    let category= Category.create({
      name: 'Category 1',
     })

     expect(category).toBeInstanceOf(Category)
     expect(category.categoryId).toBeUndefined()
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
     expect(category.categoryId).toBeUndefined()
     expect(category.name).toBe('Category 2')
     expect(category.description).toBe('Category description')
     expect(category.isActive).toBe(false)
     expect(category.createdAt).toBeInstanceOf(Date)
  })

  it('Restore a category', () => {
    let category= Category.restore({
      categoryId: '1',
      name: 'Category 1',
      description: 'Category description',
      isActive: false,
      createdAt: new Date()
    })

    expect(category).toBeInstanceOf(Category)
    expect(category.categoryId).toBe('1')
    expect(category.name).toBe('Category 1')
    expect(category.description).toBe('Category description')
    expect(category.isActive).toBe(false)
    expect(category.createdAt).toBeInstanceOf(Date)
  })

  it('Change name of category', () => {
    const  category= Category.restore({
      categoryId: '1',
      name: 'Category 1',
      description: 'Category description',
      isActive: false,
    })
    expect(category.name).toBe('Category 1')

    category.changeName('Category 2')

    expect(category.name).toBe('Category 2')
  })

  it('Change description of category', () => {
    const  category= Category.restore({
      categoryId: '1',
      name: 'Category 1',
      description: 'Category description',
      isActive: false,
    })
    expect(category.description).toBe('Category description')

    category.changeDescription('Category description 2')

    expect(category.description).toBe('Category description 2')
  })


  it('Activate a category', () => {
    const  category= Category.restore({
      categoryId: '1',
      name: 'Category 1',
      description: 'Category description',
      isActive: false,
    })
    expect(category.isActive).toBe(false)

    category.activate()

    expect(category.isActive).toBe(true)
  })

  it('Deactivate a category', () => {
    const  category= Category.restore({
      categoryId: '1',
      name: 'Category 1',
      description: 'Category description',
      isActive: true,
    })
    expect(category.isActive).toBe(true)

    category.deactivate()

    expect(category.isActive).toBe(false)
  })


  it('Convert category to JSON', () => {
    const  category= Category.restore({
      categoryId: '1',
      name: 'Category 1',
      description: 'Category description',
      isActive: true,
      createdAt: new Date()
    })

    const json= category.toJSON()

    expect(json.categoryId).toBe('1')
    expect(json.name).toBe('Category 1')
    expect(json.description).toBe('Category description')
    expect(json.isActive).toBe(true)
    expect(json.createdAt).toBeInstanceOf(Date)
  })
})