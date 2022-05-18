import {React, useEffect, useState} from 'react'
import { Card, Typography, Stack, TextField, Button, Input } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

let ingredientKey = 1;
export default function IngredientPost(data) {
  const newIngredient = [
    <Stack direction="row" spacing={2}  width="100%" alignItems="center" justifyContent="center" key={ingredientKey}>
      <Typography variant="h5">{ingredientKey}</Typography>
      <Input
        name = "ingredient_no"
        type="hidden"
        value={ingredientKey}
      />
      <TextField 
        name = "ingredient_title"
        label="재료명 / 예) 삼겹살" 
        variant="outlined" 
        fullWidth  
      />
      <TextField 
        name = "ingredient_amount"
        label="재료양 / 예) 300g" 
        variant="outlined" 
        fullWidth  
      />
    </Stack>
  ];
  
  const [ingredientComponent, setIngredientComponent] = useState([]);

  useEffect(() => {
    setIngredientComponent(data.data.map((data, idx)=>([
      <Stack direction="row" spacing={2}  width="100%" alignItems="center" justifyContent="center" key={idx+1}>
      <Typography variant="h5">{idx+1}</Typography>
      <Input
        name = "ingredient_no"
        type="hidden"
        value={idx+1}
      />
      <TextField 
        name = "ingredient_title"
        label="재료명 / 예) 삼겹살" 
        variant="outlined" 
        defaultValue={data.title}
        fullWidth  
      />
      <TextField 
        name = "ingredient_amount"
        label="재료양 / 예) 300g" 
        variant="outlined" 
        defaultValue={data.amount}
        fullWidth  
      />
    </Stack>
    ])))
    ingredientKey = data.data.length + 1;
  }, [])
  
  function handleAdd(e){
   setIngredientComponent([...ingredientComponent, newIngredient]);
   ingredientKey += 1;
  }

  function handleMinus(e){
    ingredientComponent.pop();
    setIngredientComponent([...ingredientComponent])
    ingredientKey -= 1;
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
        {ingredientComponent}
        <Stack
          direction="row"
          spacing={2}>
          <Button size="large" variant="outlined" startIcon={<AddIcon />} onClick={() => handleAdd()}>
            재료 추가
          </Button>
          {ingredientKey !== 2 ? 
          <Button size="large" variant="outlined" startIcon={<RemoveIcon />} onClick={() => handleMinus()}>
            재료 삭제
          </Button> : null}        
        </Stack>        
      </Stack>
    </Card>
  )
}
