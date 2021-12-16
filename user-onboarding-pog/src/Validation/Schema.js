import * as yup from 'yup';

const formSchema = yup.object().shape({
    first_name: yup
        .string()
        .trim()
        .required('A name is required!'),
    email: yup
        .string()
        .email('Please add a valid email adress!')
        .required('Please add your email adress!'),
    password: yup
        .string()
        .required('Please input a strong password!'),
    tos: yup
        .boolean()
        .required('Please read, and accept, our terms of service!')
})

export default formSchema;