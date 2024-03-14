# modelok

Pronounced 'model okay'. This is a simple JavaScript object validation library. 

The primary goal is to be lightweight and super easy to use in JavaScript environments regardless of your framework (React, Vue, Angular etc).

Let's say Jon Doe is filling out some info on your app but has omitted his country which is required. Thankfully you use modelok to ensure the data entered is valid before posting it to your backend.

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

# frequent questions

    - Why are the errors placed in an array?

    A single field may fail multiple validation rules therefore an array is used to collate error messages for each field.

    - Where can I place a feature request?
    
    If you need a feature that is not yet available. Feel free to leave a comment on the [github repository](https://github.com/jomeno/modelok).