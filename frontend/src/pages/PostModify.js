import { useFormik, Form, FormikProvider } from 'formik';
import { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
// material
import { Container, Stack, Typography, Grid, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import RecipeBoardPost from '../components/_dashboard/blog/modifyPost/RecipeBoardPost';
import RecipeContentsPost from '../components/_dashboard/blog/modifyPost/RecipeContentsPost';
import IngredientPost from '../components/_dashboard/blog/modifyPost/IngredientPost';
import CookStepPost from '../components/_dashboard/blog/modifyPost/CookStepPost';
import Page from '../components/Page';
import { UserInfoContextStore } from '../context/UserInfoContext';


// ----------------------------------------------------------------------
const ingredientData = [];
const cookstepData = [];
export default function PostModify() {
    const recipeId = useParams().key;
    const UserInfo = useContext(UserInfoContextStore);
    const navigate = useNavigate();
    const [recipedata, setRecipedata] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const ingredientData = [];
        const cookstepData = [];
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
            title: e.target.title.value,
            author: UserInfo.account.email,
            nickname: UserInfo.account.displayName,
            category: e.target.category.value,
            level: e.target.level.value,
            introduce: e.target.introduce.value,
            click: 0,
            recomment: 0,
            video: e.target.video.value,
            tag: e.target.tag.value,
            tip: e.target.tip.value,
            ingredient: ingredientData,
            cook_steps: cookstepData
        }
        const formData = new FormData();
        formData.append("data", new Blob([JSON.stringify(postData)], { type: "application/json" }));
        formData.append("boardimage", e.target.boardimage.files[0]);

        if(!e.target.cookstepimage.length){
          if(e.target.cookstepimage.files[0]){
            formData.append(`imageDtos[0].file`, (e.target.cookstepimage.files[0]));
          }
          formData.append(`imageDtos[0].id`, (e.target.cookstep_id.value));
          }
          else{
            for(let i = 0; i < e.target.cookstepimage.length; i+=1){
              if(e.target.cookstepimage[i].files[0]){
                formData.append(`imageDtos[${i}].file`, (e.target.cookstepimage[i].files[0]));
              }
              formData.append(`imageDtos[${i}].id`, (e.target.cookstep_id[i].value));
            }
          }
        
        await axios.patch(`http://localhost:8080/api/board/modify/${recipeId}`, formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        ).then((response) => {
            alert("레시피 수정이 완료되었습니다.");
            navigate('/home/recipe', { replace: true });
        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(async () => {
        await axios.get(`http://localhost:8080/api/recipeboard/view/${recipeId}`,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        ).then((response) => {
            setRecipedata({
                recipeInfo: [response.data.title, response.data.category, response.data.level, response.data.image],
                recipeDetail: response.data.recipeContents,
                recipeIngredient: response.data.ingredients,
                recipeStep: response.data.cookSteps
            })
        }).catch((error) => {
            console.log(error);
        });
    }, [])

    return (
        <Page title="새로운 레시피 등록 | 방구석 쉐프">
            {recipedata &&
                <Container>
                    <Typography variant="h4" gutterBottom>
                        레시피 수정
                    </Typography>
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="flex-start"
                    >
                        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                            <RecipeBoardPost data={recipedata.recipeInfo} />
                            <RecipeContentsPost data={recipedata.recipeDetail} />
                            <IngredientPost data={recipedata.recipeIngredient} />
                            <CookStepPost data={recipedata.recipeStep} />
                            <Button
                                fullWidth
                                size="large"
                                type="Submit"
                                variant="contained"
                            >
                                수정완료
                            </Button>
                        </form>
                    </Grid>
                </Container>
            }
        </Page>
    );
}
