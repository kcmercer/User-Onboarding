import React from 'react';
import styled from 'styled-components';

const FormDiv = styled.div`
    justify-content: space-around;
    display: flex;
`
const FormInput = styled.input`
    width: 80%;
`

export default function UserForm(props) {
    const {
        values,
        submit,
        change,
        disabled,
        errors
    } = props

    const onSubmit = event => {
        event.preventDefault()
        submit()
    }

    const onChange = event => {
        const { name, value, checked, type } = event.target
        const valueToUse = type === 'checkbox' ? checked: value;
        change(name, valueToUse)
    }

    return (
        <form className='form container' onSubmit={onSubmit}>
            <div className='form-group submit'>
                <h2> Register New User </h2>

                <button className='submit' disabled={disabled}> Register! </button>

                <div className='errors'>
                <div>{errors.first_name}</div>
                <div>{errors.email}</div>
                <div>{errors.password}</div>
                <div>{errors.tos}</div> 
                </div>

            </div>
            <FormDiv className='form-group inputs'>
                <label> First Name
                    <FormInput
                        value={values.first_name}
                        onChange={onChange}
                        name='first_name'
                        type='text'
                    />
                </label>

                <label> Email Address
                    <FormInput
                        value={values.email}
                        onChange={onChange}
                        name='email'
                        type='email'
                    />
                </label>

                <label> Password
                    <FormInput
                        value={values.password}
                        onChange={onChange}
                        name='password'
                        type='password'
                    />
                </label>

                <label> Please Agree to our Terms of Service
                    <FormInput
                        onChange={onChange}
                        name='tos'
                        type='checkbox'
                        checked={values.tos}
                    />
                </label>
            </FormDiv>
        </form>
    )
}