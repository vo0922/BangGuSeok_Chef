import { useFormik, Form, FormikProvider } from 'formik';
import { useState, useContext } from 'react';
import axios from 'axios';
// material
import { Container, Stack, Typography, Grid, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import RecipeBoardPost from '../components/_dashboard/blog/NewPost/RecipeBoardPost';
import RecipeContentsPost from '../components/_dashboard/blog/NewPost/RecipeContentsPost';
import IngredientPost from '../components/_dashboard/blog/NewPost/IngredientPost';
import CookStepPost from '../components/_dashboard/blog/NewPost/CookStepPost';
import Page from '../components/Page';
import { UserInfoContextStore } from '../context/UserInfoContext';


// ----------------------------------------------------------------------

export default function NewPost() {
  const UserInfo = useContext(UserInfoContextStore);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(e.target.ingredient_title.value);
  }

  return (
    <Page title="새로운 레시피 등록 | 방구석 쉐프">
      <Container>
        <Typography variant="h4" gutterBottom>
          새로운 레시피 등록
        </Typography>
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
        >
            <form autoComplete="off" noValidate onSubmit={handleSubmit}>             
              <RecipeBoardPost/>
              <RecipeContentsPost/>
              <IngredientPost/>
              <CookStepPost/>
              
              <Button
                fullWidth
                size="large"
                type="Submit"
                variant="contained"
              >
                등록완료            
              </Button>
            </form>
        </Grid> 
      </Container>
    </Page>
  );
}
