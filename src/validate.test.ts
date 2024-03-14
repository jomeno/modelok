import { describe, expect, test } from 'vitest'
import validate from './validate'

describe('validate', () => {
    test('should require field', () => {
        // arrange
        const model = { firstName: 'Jon', surname: '' }
        // act
        const results = validate(model).require('surname').done()
        // assert
        expect(results.errors.surname[0]).toBe('The surname field is required')
    })
    test('should be minLength', () => {
        // arrange
        const model = { firstName: 'Jon' }
        // act
        const results = validate(model).length('firstName', {minLength: 5}).done()
        // assert
        console.log('results', results)
        expect(results.errors.firstName[0]).toBe('Invalid length for firstName')
    })

})