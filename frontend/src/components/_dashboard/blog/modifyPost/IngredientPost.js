import { React, useEffect, useState } from 'react'
import { Grid, Card, Typography, Stack, TextField, Button, Input } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

let ingredientKey = 1;
export default function IngredientPost(data) {
  const newIngredient = [
    <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" key={ingredientKey} sx={{margin : 2}}>
      <Grid item xs={1} md={1} align="center" justifyContent="center">
        <Typography variant="h5">{ingredientKey}</Typography>
        <Input
          name="ingredient_no"
          type="hidden"
          value={ingredientKey}
        />
      </Grid>
      <Grid item xs={7} md={7}>
        <TextField
          name="ingredient_title"
          label="재료명 / 예) 삼겹살"
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid item xs={4} md={4}>
        <TextField
          name="ingredient_amount"
          label="재료양 / 예) 300g"
          variant="outlined"
          fullWidth
        />
      </Grid>
    </Stack>
  ];

  const [ingredientComponent, setIngredientComponent] = useState([]);

  useEffect(() => {
    setIngredientComponent(data.data.map((data, idx) => ([
      <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" key={ingredientKey} sx={{margin : 2}}>
      <Grid item xs={1} md={1} align="center" justifyContent="center">
        <Typography variant="h5">{idx + 1}</Typography>
        <Input
          name="ingredient_no"
          type="hidden"
          value={idx + 1}
        />
      </Grid>
      <Grid item xs={7} md={7}>
        <TextField
          name="ingredient_title"
          label="재료명 / 예) 삼겹살"
          variant="outlined"
          defaultValue={data.title}
          fullWidth
        />
      </Grid>
      <Grid item xs={4} md={4}>
        <TextField
          name="ingredient_amount"
          label="재료양 / 예) 300g"
          variant="outlined"
          defaultValue={data.amount}
          fullWidth
        />
      </Grid>
    </Stack>
    ])))
    ingredientKey = data.data.length + 1;
  }, [])

  function handleAdd(e) {
    setIngredientComponent([...ingredientComponent, newIngredient]);
    ingredientKey += 1;
  }

  function handleMinus(e) {
    ingredientComponent.pop();
    setIngredientComponent([...ingredientComponent])
    ingredientKey -= 1;
  }

  return (
    <Card sx={{paddingBottom:5, marginBottom:5}} >
      <Typography variant="h5" gutterBottom sx={{ marginLeft: 5, marginTop: 5 }}>
        재료
      </Typography>
      <Grid container spacing={2} alignItems="center" justifyContent="center" sx={{ paddingLeft: 3, paddingRight: 3 }}>
        <Grid item xs={12} md={12}>
          {ingredientComponent}
        </Grid>
        <Grid item xs={12} md={12} align="center">
          <Button size="large" variant="outlined" startIcon={<AddIcon />} onClick={() => handleAdd()}>
            재료 추가
          </Button>
          {ingredientKey !== 2 ?
            <Button size="large" variant="outlined" startIcon={<RemoveIcon />} onClick={() => handleMinus()}>
              재료 삭제
            </Button> : null}
        </Grid>
      </Grid>
    </Card>
  )
}
