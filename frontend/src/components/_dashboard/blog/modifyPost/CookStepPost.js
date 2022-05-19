import { React, useEffect, useState } from 'react'
import { Card, Stack, Typography, TextField, Button, Input } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CookStepImage from './CookStepImage';

let cookStepKey = 1;
export default function CookStepPost(data) {
  const [step, setStep] = useState(data.data.map((data) => ({src : [data.image], content: [data.contents]})));
  useEffect(() => {
    cookStepKey = data.data.length + 1;
  }, [])
  
  const handleAdd = () => {
    setStep([...step, {src:"1", content:"1"}]);
    console.log(step)
    cookStepKey += 1;
  }

  function handleMinus(e){
    step.pop();
    setStep([...step]);
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
      {step.map((data, idx) => <CookStepImage src={data.src} idx={idx} content={data.content} key={idx}/>)}
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
