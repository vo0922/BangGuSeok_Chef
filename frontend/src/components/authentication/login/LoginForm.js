import * as Yup from 'yup';
import {useContext, useState} from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import axios from 'axios';

// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

import { BaseUrlStore } from '../../../context/BaseUrlContext';

export default function LoginForm() {
  const navigate = useNavigate();
  const BaseUrl = useContext(BaseUrlStore);
  const [showPassword, setShowPassword] = useState(false);
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      axios.post(`${BaseUrl.data.baseUrl}/auth/login`, {
        "email" :  values.email,
        "password" : values.password
    })
    .then((reponse) => {
      console.log("===registerSuccessfulLoginForJwt===")
      localStorage.setItem('token', reponse.data.accessToken);
      localStorage.setItem('authenticatedUser', values.email);
      console.log(localStorage.getItem('token'));
      setupAxiosInterceptors();
      window.location.replace("/");
    })
    .catch((error) => {
      alert("로그인정보가 틀렸습니다.");
      window.location.replace("/login");
    })
    }
  });

  const setupAxiosInterceptors = () => {
    axios.interceptors.request.use(
        (config) => {
          const token = localStorage.getItem('token')
          config.headers = {
            'Authorization': `Bearer ${token}`
          }
          return config;
        },
        error => {
          Promise.reject(error)
      })
}


  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            로그인
          </LoadingButton>
        </Stack>

      </Form>
    </FormikProvider>
  );
}
