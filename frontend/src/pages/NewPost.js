import { useFormik } from 'formik';
import { useState } from 'react';
// material
import { Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';

// ----------------------------------------------------------------------

export default function NewPost() {
  
  return (
    <Page title="새로운 레시피 등록 | 방구석 쉐프">
      <Container>
        <Typography variant="h4" gutterBottom>
            새로운 레시피 등록
        </Typography>
      </Container>
    </Page>
  );
}
