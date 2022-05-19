import { React, useEffect, useState } from 'react'
import { Card, Stack, Typography, TextField, Button, Input } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function CookStepImage(data) {
const [imageSrc, setImageSrc] = useState(data.src);
  const encodeFileToBase64 = (fileBlob, idx) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      }
    })
  }

  return (
    <div>
    {imageSrc &&
    <Stack direction="row" spacing={2} sx={{width:1000}} alignItems="center" justifyContent="center" key={data.idx + 1}> 
    
      <Typography variant="h5">{data.idx + 1}</Typography>
      <Input
        id="cookstep_no"
        name = "cookstep_no"
        type="hidden"
        value={data.idx + 1}
      />
      <TextField
          id="cookstep_contents"
          name="cookstep_contents"
          label="요리 순서 / 고기를 재운다"
          fullWidth
          multiline
          defaultValue={data.content}
          minRows={3}
      />
      <Input accept="image/*" id="cookstepimage" name="cookstepimage" type="file" onChange={(e) => {
        encodeFileToBase64(e.target.files[0]);
      }} />
      {imageSrc && <img src={imageSrc} alt="preview-img" width={100} height={100} />}
    </Stack>
    }
    </div>
  )
}