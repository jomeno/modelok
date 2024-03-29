export type TLengthParams = {
    message?: string,
    minLength?: number,
    maxLength?: number
}

export type TPatternParams = {
    message?: string,
    pattern: string
}

const initLength = (params: TLengthParams = {}) => {
    let minLength = 0
    let maxLength = 50

    if(params.minLength){
        minLength = params.minLength
    }
    if(params.maxLength){
        maxLength = params.maxLength
    }

    return { ...params, minLength, maxLength }
}
/**
 * The entry point for model validation
 * @param model The model to be validated
 * @param errors A blank object for holding errors
 * @returns 
 */
const validate = (model: any, errors: any = {}) => {
    
    const _validate = {
        done: ()=>{
            if(Object.keys(errors).length > 0){
                model = {...model, errors: errors}
            }
            return model
        },
        require: (field: string, message?: string) => {
            const value = model[field]
            if(!value){
                // Add error message to errors collection
                let errorMessage = `The ${field} field is required`
                if (message) {
                    errorMessage = message
                }
                errors = addToErrors(field, errorMessage, errors)
            }

            return validate(model, errors)
        },
        length: (field: string, params?: TLengthParams) => {
            // Initialize params to some defaults
            const newParams = initLength(params)
            const value = model[field]
            const pattern = `^.{${newParams.minLength},${newParams.maxLength}}$`
            const regExp = new RegExp(pattern)
            const isValid = regExp.test(value)

            if(isValid === false){
                // Add error message to errors collection
                let errorMessage = `Invalid length for ${field}`
                if(newParams.message){
                    errorMessage = newParams.message
                }
                errors = addToErrors(field, errorMessage, errors)
            }
            return validate(model, errors)
        },
        email: (field: string, message: string) => {
            const pattern = `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`
            return _validate.pattern(field, { pattern, message })
        },
        pattern: (field: string, params: TPatternParams) => {
            const value = model[field]
            console.log('value', value, params)
            const regExp = new RegExp(params.pattern)
            const isValid = regExp.test(value)

            if(isValid === false){
                // Add error message to errors collection
                let errorMessage = `No format match for ${field}`
                if(params.message){
                    errorMessage = params.message
                }
                errors = addToErrors(field, errorMessage, errors)
            }

            return validate(model, errors)
        }
    }

    return _validate
}

export default validate

/**
 * Adds an error message to the errors collection
 * @param field The name of the field on the model being validated
 * @param errorMessage
 * @param errors 
 * @returns The updated errors object
 */
const addToErrors = (field:string, errorMessage: string, errors: any) => {
    
    let existingErrors = []
    if (Array.isArray(errors[field])) {
        existingErrors = errors[field]
    }

    errors = { ...errors, [field] : [...existingErrors, errorMessage]}
    return errors
}
