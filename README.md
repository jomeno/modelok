# modelok

Pronounced 'model okay' is a simple JavaScript object validation library. 

The primary goal is to be lightweight and super easy to use in JavaScript environments 
regardless of your framework of choice (React, Vue, Angular etc).

Let's say Jon Doe is filling out some info on your app but has omitted his country 
which is required. Thankfully you use modelok to ensure the data entered is valid 
before posting it to your backend.

# how to use

1. First install using `npm i modelok` and import into your project.
    
    ```
    import validate from 'modelok'
    ```

3. Instantiate with your data model and chain your desired validation rules.

    ```
    const model = { 
        firstName: 'Jon', 
        surname: 'Doe', 
        country: '',
        email: 'jon.doe@' 
    }
    const results = validate(model).
            required('firstName').
            length('firstName', { minLength: 10 }).
            email('email', 'Please enter a valid email').
            done()
    ```
    
**IMPORTANT NOTE - You must call `.done()` at the end to get results.**

4. Receive your model back with any validation errors.

    ```
    const model = { 
        firstName: 'Jon', 
        surname: 'Doe', 
        country: '',
        email: 'jon.doe@', 
        errors: {
            'firstName': ['Invalid length for firstName'],
            'country: ['The country field is required'],
            'email': ['Please enter a valid email']
        } 
    }
    ```

# parameters

| Validator | Parameter | Description | Type | Example
| ---       | ---       | ---         | ---  | ---
| .length()   | field     | The first parameter is `required` to be the property on your model holding the value to be validated. | string | `'firstName'` 
|    | rules     | The second parameter is an `optional` object containing message, minLength and maxLength, all of which are also `optional`. | object | `{ message: 'Your first name must be between 3 and 100 characters long.', minLength: 3, maxLength: 100  }` 

# frequent questions

    - Why are the errors placed in an array?

    A single field may fail multiple validation rules therefore 
    an array is used to collate error messages for each field.

    - Can I validate an array field?

    This feature is currently under development and will be available soon.

    - Where can I place a feature request?
    
    If you need a feature that is not yet available. Feel free to 
    create an issue on the github repo, github.com/jomeno/modelok.