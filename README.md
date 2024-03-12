# modelok

Pronounced 'model okay' is a simple JavaScript validation library.

The primary goal is to be lightweight and super easy to use in JavaScript environments regardless of your framework (React, Vue, Angular etc).

# how to use

1. Import into your project.
    
    ```
    import validate from 'modelok'
    ```

3. Instantiate with your data model and chain your desired validation rules.

    ```
    const model = { 
        name: 'Jon', 
        surname: 'Doe', 
        country: '' 
    }
    const results = validate(model).
                        required('name').
                        length('name', { minLength: 10 })
    ```

4. Receive your model back with any validation errors.

    ```
    const model = { 
        name: 'Jon', 
        surname: 'Doe', 
        country: '', 
        errors: {
            'name': ['Invalid length for name'],
            'country: ['The country field is required']
        } 
    }
    ```