import React from 'react'
import { Card, Stack, Paper, TextField, Typography, FormControl, Select, MenuItem, InputLabel, Input, Button, Grid } from '@mui/material'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { UserInfoContextStore } from '../../../../context/UserInfoContext';


export default function RecipeBoardPost() {
    const [category, setCategory] = React.useState('');
    const [level, setLevel] = React.useState('');

    const categoryChange = (event) => {
        setCategory(event.target.value);
    };
    const levelChange = (event) => {
        setLevel(event.target.value);
    }
    const [imageSrc, setImageSrc] = React.useState();
    const encodeFileToBase64 = (fileBlob) => {
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
    <Card sx={{paddingBottom:5, marginBottom:5 }}>
        <Typography variant="h5" gutterBottom sx={{marginLeft : 5, marginTop : 5}}>
            레시피 정보
        </Typography>
        <Grid container spacing={2} alignItems="center" justifyContent="center" sx={{paddingLeft : 3, paddingRight : 3}}>
            <Grid item xs={12} md={12}>
                <TextField 
                    id="title" 
                    label="레시피 제목 / 예) 맛있는 돼지김치찌개" 
                    variant="outlined"
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
            <Grid item xs={12} md={12} justifyContent="center" alignItems="center" sx={{display:"flex"}}>
                {imageSrc && <img src={imageSrc} alt="preview-img" height={400} width={600} />}
            </Grid>
            <Grid item xs={12} md={12} align="center">
                <label htmlFor="boardimage">
                <Input accept="image/*" name="boardimage" id="boardimage" type="file" sx={{display:"none"}} onChange={(e) => {
                  encodeFileToBase64(e.target.files[0])
                }}/>
                <Button variant="outlined" component="span" startIcon={<AddAPhotoIcon />}>
                  레시피 대표 사진 등록
                </Button>
              </label>
            </Grid>                    
        </Grid>
    </Card> 
  )
}
