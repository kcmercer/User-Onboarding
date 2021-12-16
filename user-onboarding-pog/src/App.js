import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import * as yup from 'yup';
import UserForm from './Form';
import formSchema from './Validation/Schema'

const initialFormValues = {
  name:'',
  email:'',
  password:'',
  tos: false
};

const initialFormErrors = {
  name:'',
  email:'',
  password:'',
  tos: false
};

const initialDisabled = true;

function App() {

  const [ user, setUser ] = useState([]);
  const [ formValues, setFormValues ] = useState(initialFormValues);
  const [ disabled, setDisabled ] = useState(initialDisabled);
  const [ formErrors, setFormErrors ] = useState(initialFormErrors);

  const getNewUser = () => {
    axios.get('https://reqres.in/api/users')
      .then(resp => {
        console.log(resp.data.data);
      }).catch(error => console.error(error))
  }

  // console.log(getNewUser());

  const postNewUser = newUser => {
    axios.post('https://reqres.in/api/users', newUser )
    .then(resp => {
      console.log(resp.data.data);
      setUser([resp.data.data, ...user ]);
    }).catch(error => console.log(error))
    .finally(() => setFormValues(initialFormValues))
  }

  const submitForm = () => {
    const newUser = {
      name: formValues.first_name,
      email: formValues.email,
      password: formValues.password,
      tos: false
    }
    postNewUser(newUser);
  }

  const validation = (name, value) => {
    yup.reach(formSchema, name)
      .validate(value)
      .then(() => setFormErrors({...formErrors, [name]:''}))
      .catch(error => setFormErrors({...formErrors, [name]: error.errors[0]}))
  }

  const inputChange = (name, value) => {
    validation(name, value);
    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  useEffect(() => {
    formSchema.isValid(formValues).then(valid => setDisabled(!valid))
  }, [formValues])
  return (
    <div className="App">
      <header><h1>User Registration</h1></header>

      <pre>{JSON.stringify(user)}</pre>

      <UserForm
        values={formValues}
        submit={submitForm}
        disabled={disabled}
        change={inputChange}
        errors={formErrors}
      />

      {/* {
        user.map(user => {
          return (
            <User key={user.id} details={user} />
          )
        })
      } */}
    </div>
  );
}

export default App;
