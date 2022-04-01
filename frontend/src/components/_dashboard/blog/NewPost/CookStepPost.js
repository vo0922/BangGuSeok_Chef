import React from 'react'
import { Card, Stack, Typography, TextField, Button, Input } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';

let cookStepKey = 1;
let cookStep = [];
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

  cookStep = newCookStep;
  const [cookStepAdd, setCookStepAdd] = React.useState({
    body : ""
  })

  const handleAdd = () => {
    cookStepKey += 1;
    cookStep = [...cookStepAdd.body, newCookStep];
    setCookStepAdd({
      body : cookStep
    })
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
        {cookStepAdd.body}
        <Button size="large" variant="outlined" startIcon={<AddIcon />} onClick={() => handleAdd()}>
          요리 순서 추가
        </Button>
      </Stack>
    </Card>
  )
}
