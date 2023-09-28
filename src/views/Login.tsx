import { Box, Button, Card, CardContent, CardHeader, TextField } from '@mui/material';
import CircularLoader from 'components/CircularLoader';
import { loginFormInitialValue } from 'constant/login';
import { loginFormValidation } from 'constant/validation';
import { Form, FormikProvider, useFormik } from 'formik';
import { LoginForm } from 'interfaces/login';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postParticipant } from 'services/participants.service';
import * as Yup from 'yup';

const Login = () => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = async (values: LoginForm) => {
        setIsLoading(true);
        postParticipant(values).then((res) => {
            sessionStorage.setItem('user', JSON.stringify(res));
            setIsLoading(false);
            navigate('/quiz');
        });
    };
    const formik = useFormik({
        initialValues: loginFormInitialValue,
        validationSchema: Yup.object().shape(loginFormValidation),
        onSubmit: handleSubmit,
    });
    const { touched, errors, values, handleChange, handleBlur } = formik;
    return (
        <FormikProvider value={formik}>
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh" width="100vw" bgcolor="#e8e9eb">
                <Form>
                    <Card sx={{ minWidth: '35vw', maxWidth: 640, borderRadius: '10px' }}>
                        <CardHeader title="Quiz registration" subheader="Please enter your details before kicking off the quiz." />
                        <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                            <TextField
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                sx={{ mb: 2 }}
                                helperText={touched.name && errors.name}
                                error={touched.name && !!errors.name}
                                label="Name"
                                name="name"
                                variant="outlined"
                            />
                            <TextField
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                helperText={touched.email && errors.email}
                                error={touched.email && !!errors.email}
                                sx={{ my: 2 }}
                                label="Email"
                                name="email"
                                variant="outlined"
                            />
                            <Button fullWidth variant="contained" type="submit">
                                Submit
                            </Button>
                        </CardContent>
                    </Card>
                </Form>
            </Box>
            <CircularLoader isLoading={isLoading} />
        </FormikProvider>
    );
};

export default Login;
