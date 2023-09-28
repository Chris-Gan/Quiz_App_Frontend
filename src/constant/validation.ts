import * as Yup from 'yup';

export const loginFormValidation = {
    email: Yup.string().email('Invalid email format').required('This field is required'),
    name: Yup.string().required('This field is required'),
};
