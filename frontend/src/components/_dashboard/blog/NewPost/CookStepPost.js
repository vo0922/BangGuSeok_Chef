import { React, useEffect, useState } from 'react'
import { Card, Stack, Typography, TextField, Button, Input, Grid } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

let cookStepKey = 1;
export default function CookStepPost() {
  const newCookStep = [
    <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" key={cookStepKey} sx={{margin:2}}>
      <Grid item xs={1} md={1} align="center" justifyContent="center">
        <Typography variant="h5">{cookStepKey}</Typography>
      </Grid>
      
        <Input
          id="cookstep_no"
          name = "cookstep_no"
          type="hidden"
          value={cookStepKey}
        />
      
      <Grid item xs={7} md={7}>      
        <TextField
            id="cookstep_contents"
            name="cookstep_contents"
            label="요리 순서 / 고기를 재운다"
            fullWidth
            multiline
            minRows={3}
        />
      </Grid>
      <Grid item xs={4} md={4}>
        <Input accept="image/*" id="cookstepimage" name="cookstepimage" type="file"/>
      </Grid>
    </Stack>
  ];

  const [cookStepComponent, setCookStepComponent] = useState([])


  useEffect(() => {
    setCookStepComponent([newCookStep])
    cookStepKey += 1;
  }, [])
  
  const handleAdd = () => {
    setCookStepComponent([...cookStepComponent, newCookStep]);
    cookStepKey += 1;
  }

  function handleMinus(e){
    cookStepComponent.pop();
    setCookStepComponent([...cookStepComponent])
    cookStepKey -= 1;
  }

  return (
    <Card sx={{paddingBottom:5, marginBottom:5}} >
      <Typography variant="h5" gutterBottom sx={{marginLeft : 5, marginTop : 5}}>
          요리 순서
      </Typography>
      <Grid container spacing={2} alignItems="center" justifyContent="center" sx={{paddingLeft : 3, paddingRight : 3}}>
        <Grid item xs={12} md={12}>
          {cookStepComponent}
        </Grid>
        <Grid item xs={12} md={12} align="center">
          <Button size="large" variant="outlined" startIcon={<AddIcon />} sx={{margin:2}} onClick={() => handleAdd()}>
            요리 순서 추가
          </Button>
          {cookStepKey !== 2 ? 
            <Button size="large" variant="outlined" startIcon={<RemoveIcon />} sx={{margin:2}} onClick={() => handleMinus()}>
              요리 순서 삭제
            </Button> : null}
        </Grid>
      </Grid>
    </Card>
  )
}
