import React, { useEffect } from 'react'
import { Grid, Card, Stack, Paper, TextField, Typography, FormControl, Select, MenuItem, InputLabel, Input, Button } from '@mui/material'
import { UserInfoContextStore } from '../../../../context/UserInfoContext';

export default function RecipeBoardPost(data) {
    const [category, setCategory] = React.useState(data.data[1]);
    const [level, setLevel] = React.useState(data.data[2]);
    const [imageSrc, setImageSrc] = React.useState(data.data[3]);
    const categoryChange = (event) => {
        setCategory(event.target.value);
    };
    const levelChange = (event) => {
        setLevel(event.target.value);
    }
    const encodeFileToBase64 = (fileBlob) => {
        if(fileBlob){
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
        <Card sx={{ paddingBottom: 5, marginBottom: 5 }}>
            <Typography variant="h5" gutterBottom sx={{ marginLeft: 5, marginTop: 5 }}>
                레시피 정보
            </Typography>
            <Grid container spacing={2} alignItems="center" justifyContent="center" sx={{paddingLeft : 3, paddingRight : 3}}>
                <Grid item xs={12} md={12}>
                    <TextField
                        id="title"
                        label="레시피 제목 / 예) 맛있는 돼지김치찌개"
                        variant="outlined"
                        defaultValue={data.data[0]}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6} md={6}>
                    <FormControl fullWidth>
                        <InputLabel id="categoryLabel">카테고리</InputLabel>
                        <Select
                            labelId="categoryLabel"
                            id="category"
                            name="category"
                            value={category}
                            label="카테고리"
                            onChange={categoryChange}
                        >
                            <MenuItem value="탕">탕</MenuItem>
                            <MenuItem value="전골">전골</MenuItem>
                            <MenuItem value="찌개">찌개</MenuItem>
                            <MenuItem value="국">국</MenuItem>
                            <MenuItem value="볶음">볶음</MenuItem>
                            <MenuItem value="면">면</MenuItem>
                            <MenuItem value="밥">밥</MenuItem>
                            <MenuItem value="반찬">반찬</MenuItem>
                            <MenuItem value="안주">안주</MenuItem>
                            <MenuItem value="주류">주류</MenuItem>
                            <MenuItem value="튀김">튀김</MenuItem>
                            <MenuItem value="제과">제과</MenuItem>
                            <MenuItem value="제빵">제빵</MenuItem>
                            <MenuItem value="기타">기타</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6} md={6}>
                        <FormControl fullWidth>
                            <InputLabel id="levelLabel">난이도</InputLabel>
                            <Select
                                labelId="levelLabel"
                                id="level"
                                name="level"
                                value={level}
                                label="난이도"
                                onChange={levelChange}
                            >
                                <MenuItem value="상">상</MenuItem>
                                <MenuItem value="중">중</MenuItem>
                                <MenuItem value="하">하</MenuItem>
                            </Select>
                        </FormControl>
                </Grid>
                    <Grid item xs={6} md={6} align="right">
                        <Typography variant="h6">완성요리 사진</Typography>
                    </Grid>
                    <Grid item xs={6} md={6} sx={{marginBottom:"10px"}}>
                        <Input accept="image/*" name="boardimage" id="boardimage" type="file" onChange={(e) => {
                            encodeFileToBase64(e.target.files[0]);
                        }} />
                    </Grid>
                    {imageSrc && <img src={imageSrc} alt="preview-img" height={400} width={600} />}
                    </Grid>
        </Card>
    )
}
