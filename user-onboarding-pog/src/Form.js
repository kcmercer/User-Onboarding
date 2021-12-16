import React from 'react';

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

                <button disabled={disabled}> Register! </button>

                <div className='errors'>
                </div>

            </div>
            <div className='form-group inputs'>
                <h4> User Information </h4>
                <label> First Name
                    <input
                        value={values.first_name}
                        onChange={onChange}
                        name='first_name'
                        type='text'
                    />
                </label>

                <label> Email Address
                    <input
                        value={values.email}
                        onChange={onChange}
                        name='email'
                        type='email'
                    />
                </label>

                <label> Password
                    <input
                        value={values.password}
                        onChange={onChange}
                        name='password'
                        type='password'
                    />
                </label>

                <label> Please Agree to our Terms of Service
                    <input
                        onChange={onChange}
                        name='tos'
                        type='checkbox'
                        checked={values.tos}
                    />
                </label>
            </div>
        </form>
    )
}