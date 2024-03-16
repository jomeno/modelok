import { describe, expect, test } from 'vitest'
import validate from './modelok'

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
        expect(results.errors.firstName[0]).toBe('Invalid length for firstName')
    })
    test('should not exceed maxLength', () => {
        // arrange
        const model = { firstName: 'Jonny' }
        // act
        const results = validate(model).length('firstName', {maxLength: 3 }).done()
        // assert
        console.log('results', results)
        expect(results.errors.firstName[0]).toBe('Invalid length for firstName')
    })

})