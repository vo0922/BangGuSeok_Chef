import { useFormik, Form, FormikProvider } from 'formik';
import { React, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    const ingredientData = [];
    const cookstepData = [];
    console.log(UserInfo.account);
    console.log(e.target.ingredient_no.length);

    if(!e.target.ingredient_no.length){
      const data = {
        ingredient_no : e.target.ingredient_no.value,
        title : e.target.ingredient_title.value,
        amount : e.target.ingredient_amount.value
      };
      ingredientData.push(data);
    }
    else{
      for(let i = 0; i < e.target.ingredient_no.length; i+=1){
        const data = {
          ingredient_no : e.target.ingredient_no[i].value,
          title : e.target.ingredient_title[i].value,
          amount : e.target.ingredient_amount[i].value
        };
        ingredientData.push(data);
      }
    }

    if(!e.target.cookstep_no.length){
      const data = {
        step_no : e.target.cookstep_no.value,
        contents : e.target.cookstep_contents.value,
        image : "no"
      };
      cookstepData.push(data);
    }else{
      for(let i = 0; i < e.target.cookstep_no.length; i+=1){
        const data = {
          step_no : e.target.cookstep_no[i].value,
          contents : e.target.cookstep_contents[i].value,
          image : "no"
        };
        cookstepData.push(data);
      }
    }

    const postData = {
      title : e.target.title.value,
      author : UserInfo.account.email,
      nickname : UserInfo.account.displayName,
      category : e.target.category.value,
      level : e.target.level.value,
      introduce : e.target.introduce.value,
      click : 0,
      recomment : 0,
      video : e.target.video.value,
      tag : e.target.tag.value,
      tip : e.target.tip.value,
      ingredient : ingredientData,
      cook_steps : cookstepData
    }
    const formData = new FormData();
    formData.append("data", new Blob([JSON.stringify(postData)], {type: "application/json"}));
    formData.append("boardimage", e.target.boardimage.files[0]);
    // formData.append("cookstepimage", e.target.cookstepimage.files);
    if(!e.target.cookstepimage.length){
      formData.append("cookstepimage", (e.target.cookstepimage.files[0]));
    }
    else{
      for(let i = 0; i < e.target.cookstepimage.length; i+=1){
        formData.append("cookstepimage", (e.target.cookstepimage[i].files[0]));
      }
    }
    
    console.log(JSON.stringify(postData));

    await axios.post("http://localhost:8080/api/board/create", formData,
    {
      headers:{
        "Content-Type" : "multipart/form-data",
        Authorization : `Bearer ${localStorage.getItem('token')}`
      }
    }
  ).then((response) => {
    if(response.status === 200){
      console.log(response);
      alert("레시피 등록이 완료되었습니다.");
      navigate('/home/recipe', { replace: true });
    }
    else{
      alert("레시피 등록에 실패했습니다.");
    }
  }).catch((error) => {
    console.log(error);
  });
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
