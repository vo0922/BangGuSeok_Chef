import React from 'react'
import { Card, Typography, Stack, TextField, Grid } from '@mui/material'

export default function RecipeContentsPost(data) {
    return (
        <Card sx={{ paddingBottom: 5, marginBottom: 5 }} >
            <Typography variant="h5" gutterBottom sx={{ marginLeft: 5, marginTop: 5 }}>
                레시피 상세 정보
            </Typography>
            <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ paddingLeft: 3, paddingRight: 3 }}>
                <Grid item xs={12}>
                    <TextField
                        id="introduce"
                        name="introduce"
                        label="요리 소개 / 이 레시피가 특별한 이유를 적어주세요."
                        defaultValue={data.data.introduce}
                        fullWidth
                        multiline
                        minRows={5}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="video"
                        name="video"
                        label="동영상 주소(유튜브)"
                        variant="outlined"
                        defaultValue={data.data.video}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="tip"
                        name="tip"
                        label="요리를 할 때 참고하면 좋은 팁을 적어주세요!"
                        fullWidth
                        multiline
                        defaultValue={data.data.tip}
                        minRows={5}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="tag"
                        name="tag"
                        label="태그를 입력해주세요! / 예) #김치찌개 #김치"
                        defaultValue={data.data.tag}
                        fullWidth
                        multiline
                        minRows={3}
                    />
                </Grid>
            </Grid>
        </Card>
    )
}
