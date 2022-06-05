import { React, useEffect, useState } from 'react'
import { Grid, Card, Stack, Typography, TextField, Button, Input } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function CookStepImage(data) {
  const [imageSrc, setImageSrc] = useState(data.src);
  const encodeFileToBase64 = (fileBlob, idx) => {
    if (fileBlob) {
      const reader = new FileReader();
      reader.readAsDataURL(fileBlob);
      return new Promise((resolve) => {
        reader.onload = () => {
          setImageSrc(reader.result);
          resolve();
        }
      })
    }
  }

  return (
    <div>
      {imageSrc &&
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" key={data.idx + 1} sx={{ margin: 2 }}>
          <Grid item xs={1} md={1} align="center" justifyContent="center">
            <Typography variant="h5">{data.idx + 1}</Typography>
          </Grid>

          <Input
            id="cookstep_id"
            name="cookstep_id"
            type="hidden"
            value={data.id}
          />

          <Input
            id="cookstep_no"
            name="cookstep_no"
            type="hidden"
            value={data.idx + 1}
          />

          <Grid item xs={7} md={7}>
            <TextField
              id="cookstep_contents"
              name="cookstep_contents"
              label="요리 순서 / 고기를 재운다"
              fullWidth
              multiline
              defaultValue={data.content === " " ? null : data.content}
              minRows={3}
            />
          </Grid>
          <Grid item xs={4} md={4}>
            <Input accept="image/*" id="cookstepimage" name="cookstepimage" type="file" onChange={(e) => {
              encodeFileToBase64(e.target.files[0]);
            }} />
          </Grid>
          {imageSrc !== " " && <img src={imageSrc} alt="preview-img" width="100px" height="100px" />}
        </Stack>
      }
    </div>
  )
}
