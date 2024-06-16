import { InvalidUuidError } from "../../errors/invalid-uuid-error"
import { Uuid } from "../uuid.vo"

describe('Uuid Unit Test', () => {

  describe('Error cases', () => {
    it('Deve retornar um erro caso o id seja inválido', () => {
      expect(() => new Uuid('invalid_id')).toThrow(InvalidUuidError)
    })
  })
  describe('Success cases', () => {
    it('Deve criar um id válido caso nenhum id seja passado', () => {
      const spy = jest.spyOn(Uuid.prototype as any, 'validate')
      const uuid = new Uuid()
      expect(uuid.id).toBeTruthy()
      expect(spy).toHaveBeenCalled()
      
    })
    it('Deve criar um id válido caso um id seja passado', () => {
      const uuid = new Uuid('c3b4e5e9-9c7e-4c4c-8b1d-4f2b4b0d9d9f')
      expect(uuid.id).toBe('c3b4e5e9-9c7e-4c4c-8b1d-4f2b4b0d9d9f')
    })
  })
})