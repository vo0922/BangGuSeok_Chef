import React from 'react'
import { Card, Typography, Stack, TextField} from '@mui/material'

export default function RecipeContentsPost() {
  return (
    <Card sx={{margin : 5}} >
        <Typography variant="h5" gutterBottom sx={{marginLeft : 5, marginTop : 5}}>
            레시피 상세 정보
        </Typography>
        <Stack 
            direction="column"
            justifyContent="space-around"
            alignItems="center"
            spacing={4}
            padding={5}
        >
            <TextField
                id="introduce"
                name="introduce"
                label="요리 소개 / 이 레시피가 특별한 이유를 적어주세요."
                fullWidth
                multiline
                minRows={5}
            />
            <TextField 
                id="video"
                name="video"
                label="동영상 주소(유튜브)" 
                variant="outlined" 
                fullWidth 
            />
            
            <TextField
                id="tip"
                name="tip"
                label="요리를 할 때 참고하면 좋은 팁을 적어주세요!"
                fullWidth
                multiline
                minRows={5}
            />
            <TextField
              id="tag"
              name="tag"
              label="태그를 입력해주세요! / 예) #김치찌개 #김치"
              fullWidth
              multiline
              minRows={3}
            />
        </Stack>
    </Card>
  )
}
