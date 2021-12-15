import logo from './logo.svg';
import React, { useState } from 'react';
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
      name: formValues.first_name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      tos: false
    }
    postNewUser(newUser);
  }
  

  return (
    <div className="App">
      <header><h1>User Registration</h1></header>

      <UserForm
        values={formValues}
        submit={submitForm}
        disabled={disabled}
      />
    </div>
  );
}

export default App;
