import { React, useEffect, useState } from 'react'
import { Grid, Card, Stack, Typography, TextField, Button, Input } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CookStepImage from './CookStepImage';

let cookStepKey = 1;
export default function CookStepPost(data) {
  const [step, setStep] = useState(data.data.map((data) => ({src : [data.image], content: [data.contents], id : data.id, step_no: data.step_no})));
  useEffect(() => {
    cookStepKey = data.data.length + 1;
  }, [])
  
  const handleAdd = () => {
    setStep([...step, {src:" ", content:" "}]);
    console.log(step)
    cookStepKey += 1;
  }

  function handleMinus(e){
    step.pop();
    setStep([...step]);
    cookStepKey -= 1;
  }

  return (
    <Card sx={{paddingBottom:5, marginBottom:5}} >
      <Typography variant="h5" gutterBottom sx={{marginLeft : 5, marginTop : 5}}>
          요리 순서
      </Typography>
      <Grid container spacing={2} alignItems="center" justifyContent="center" sx={{paddingLeft : 3, paddingRight : 3}}>
      <Grid item xs={12} md={12}>
      {step.sort((a, b) =>
        a.step_no - b.step_no
      )
      .map((data, idx) => <CookStepImage src={data.src} idx={idx} content={data.content} key={idx} id={data.id}/>)}
        </Grid>
        <Grid item xs={12} md={12} align="center">
          <Button size="large" variant="outlined" startIcon={<AddIcon />}sx={{margin:2}}  onClick={() => handleAdd()}>
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
