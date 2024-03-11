import './style.css'
import validate from './validate.ts'

const model = {
  name: 'Jon',
  surname: 'Doe',
  country: ''
}
const results = validate(model).
      require('name').
      length('name', { minLength: 5 }).
      require('country').
      done()

//console.log('validation results', results)

let errorFields: string[] = []
if(results.errors){
  errorFields = Object.keys(results.errors)
}

const displayErrors =  errorFields.map((field:string) => 
  `<span>${JSON.stringify(results.errors[field])}</span>`
)

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <h1>model okay</h1>
    <h3>your model</h3>
    <div style='border:1px solid white; padding:20px'>
      ${JSON.stringify(model)}
    </div>
    <h3>model with errors</h3>
    <p>After calling .done() you receive your model infused with all the validation errors based on your validation rules.</p>
    <div style='border:1px solid white; padding:20px'>
      ${JSON.stringify(results)}
    </div>
    <h3>all errors by fields</h3>
    <div style='border:1px solid white; padding:20px'>
      ${JSON.stringify(results.errors) ?? ''}
    </div>
    <h3>all error messages</h3>
    <div style='border:1px solid white; padding:20px'>
      ${displayErrors ?? ''}
    </div>
    <div class="card">
      <button type="button">Validate</button>
    </div>
    <p class="read-the-docs">
      Visit the <a href="https://github.com/jomeno/modelok/blob/main/README.md">docs to learn more</a>
    </p>
    </div>`

//setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
