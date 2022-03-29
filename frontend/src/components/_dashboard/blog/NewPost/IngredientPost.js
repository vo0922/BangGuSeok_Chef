import React from 'react'
import { Card, Typography, Stack, TextField, Button, Input } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';


let ingredientKey = 1;
let ingredient = [];
export default function IngredientPost() {
  const ingredientData = [];
  const newIngredient = [
    <Stack direction="row" spacing={2} sx={{width:1000}} alignItems="center" justifyContent="center" key={ingredientKey}>
      <Typography variant="h5">{ingredientKey}</Typography>
      <Input
        id="ingredient_no"
        name = "ingredient_no"
        type="hidden"
        value={ingredientKey}
      />
      <TextField 
        id="ingredient_title"
        name = "ingredient_title"
        label="재료명 / 예) 삼겹살" 
        variant="outlined" 
        fullWidth  
      />
      <TextField 
        id="amount" 
        name = "amount"
        label="재료양 / 예) 300g" 
        variant="outlined" 
        fullWidth  
      />
    </Stack>
  ];

  ingredient = newIngredient;
  
  const [ingredientAdd, setIngredientAdd] = React.useState({
    body: ingredient
  });
  
  function handleAdd(e){
   ingredientKey += 1;
   ingredient = [...ingredientAdd.body, newIngredient];
   setIngredientAdd({
     body : ingredient
   });
  }
  
  return (
    <Card sx={{margin : 5}} >
      <Typography variant="h5" gutterBottom sx={{marginLeft : 5, marginTop : 5}}>
        재료
      </Typography>
    <Stack 
        direction="column"
        justifyContent="space-around"
        alignItems="center"
        spacing={4}
        padding={5}
    >
        {ingredientAdd.body}
        <Button size="large" variant="outlined" startIcon={<AddIcon />} onClick={() => handleAdd()}>
          재료 추가
        </Button>
      </Stack>
    </Card>
  )
}
