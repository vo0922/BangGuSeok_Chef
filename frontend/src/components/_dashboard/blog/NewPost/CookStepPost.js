import { React, useEffect, useState } from 'react'
import { Card, Stack, Typography, TextField, Button, Input } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

let cookStepKey = 1;
export default function CookStepPost() {
  const newCookStep = [
    <Stack direction="row" spacing={2} sx={{width:1000}} alignItems="center" justifyContent="center" key={cookStepKey}>
      <Typography variant="h5">{cookStepKey}</Typography>
      <Input
        id="cookstep_no"
        name = "cookstep_no"
        type="hidden"
        value={cookStepKey}
      />
      <TextField
          id="cookstep_contents"
          name="cookstep_contents"
          label="요리 순서 / 고기를 재운다"
          fullWidth
          multiline
          minRows={3}
      />
      <Input accept="image/*" id="cookstepimage" name="cookstepimage" type="file" />
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
    <Card sx={{margin : 5}} >
      <Typography variant="h5" gutterBottom sx={{marginLeft : 5, marginTop : 5}}>
          요리 순서
      </Typography>
    <Stack 
        direction="column"
        justifyContent="space-around"
        alignItems="center"
        spacing={4}
        padding={5}
    >
        {cookStepComponent}
        <Stack
          direction="row"
          spacing={2}>
          <Button size="large" variant="outlined" startIcon={<AddIcon />} onClick={() => handleAdd()}>
            요리 순서 추가
          </Button>
          {cookStepKey !== 2 ? 
            <Button size="large" variant="outlined" startIcon={<RemoveIcon />} onClick={() => handleMinus()}>
              요리 순서 삭제
            </Button> : null}
        </Stack>
      </Stack>
    </Card>
  )
}
