import * as Yup from 'yup';
import { useState } from 'react';
import axios from 'axios';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { values } from 'lodash';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    nickname: Yup.string()
      .min(2, 'Too Short!')
      .required('nickname required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      nickname: '',
      email: '',
      password: '',
      gender: '',
      age: '',

    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      axios.post("http://localhost:8080/auth/signup", {
        "email" :  values.email,
        "password" : values.password,
        "gender" : values.gender,
        "nickname" : values.nickname,
        "profile" : values.profile,
        "age" : values.age
    })
    .then((response) => {
      console.log(response)
      navigate('/login', { replace: true });
    })
    .catch((error) => {
      alert("회원가입에 실패하였습니다.");
      window.location.replace("/register")
    })
    }
  });

  const { errors, touched, handleSubmit, values, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
        <TextField
            fullWidth
            label="nickanme을 입력하세요."
            {...getFieldProps('nickname')}
            error={Boolean(touched.nickname && errors.nickname)}
            helperText={touched.nickname && errors.nickname}
          />

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="email을 입력하세요."
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password을 입력하세요."
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
          
          <TextField
            fullWidth
            label="gender을 입력하세요."
            {...getFieldProps('gender')}
            error={Boolean(touched.gender && errors.gender)}
            helperText={touched.gender && errors.gender}
          />

          <TextField
            fullWidth
            label="age를 입력하세요."
            {...getFieldProps('age')}
            error={Boolean(touched.age && errors.age)}
            helperText={touched.age && errors.age}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
