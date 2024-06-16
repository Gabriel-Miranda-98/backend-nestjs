import { ValueObject } from "../value-object"

class StringValueObjectStub extends ValueObject {
  constructor(readonly value: string) {
    super()
  }
}

class ComplexValueObjectStub extends ValueObject {
  constructor(readonly value: string, readonly value2: number) {
    super()
  }

}

describe('ValueObject', () => {

  it('Precisa ser verdadeiro quando comparado com ele mesmo', () => {
    const valueObject1 = new StringValueObjectStub('any_value')
    const valueObject2 = new StringValueObjectStub('any_value')

    expect(valueObject1.equals(valueObject2)).toBe(true)
  })

  it('Precisa ser falso quando comparado com outro tipo de ValueObject', () => {
    const valueObject1 = new StringValueObjectStub('any_value')
    const valueObject2 = new ComplexValueObjectStub('any_value', 1)

    expect(valueObject1.equals(valueObject2)).toBe(false)
  })

  it('Precisa ser falso quando comparado com null', () => {
    const valueObject1 = new StringValueObjectStub('any_value')
    expect(valueObject1.equals(null as any)).toBe(false)
  })

  it('Precisa ser falso quando comparado com undefined', () => {
    const valueObject1 = new StringValueObjectStub('any_value')
    expect(valueObject1.equals(undefined as any)).toBe(false)
  })
  it("Precisa ser falso quando os valores são diferentes", () => {
    const valueObject1 = new StringValueObjectStub("any_value")
    const valueObject2 = new StringValueObjectStub("other_value")

    expect(valueObject1.equals(valueObject2)).toBe(false)
  })

})