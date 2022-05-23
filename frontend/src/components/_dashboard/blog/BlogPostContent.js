import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ReactPlayer from 'react-player';
// material
import { Grid, Button, Container, Stack, Typography, Card, CardMedia, TextField, Avatar, Divider, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

// ----------------------------------------------------------------------


export default function BlogPostContent({ data, UserInfo, recipeId, title }) {
    const navigate = useNavigate();
    const [likeCheck, setlickCheck] = useState();
    const recommendClick = async () => {
        await axios.get(`http://localhost:8080/api/recipeboard/view/like/?recipe_id=${recipeId}&email=${localStorage.getItem('authenticatedUser')}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                setlickCheck(response.data);
            }).catch(err => {
                console.log(err);
            });
    }
    const recommendCheck = async () => {
        await axios.get(`http://localhost:8080/api/recipeboard/view/like/check?recipe_id=${recipeId}&email=${localStorage.getItem('authenticatedUser')}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                setlickCheck(response.data);
            }).catch(err => {
                console.log(err);
            });
    }
    const deleteRecipe = async (id) => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            await axios.delete(`http://localhost:8080/api/recipeboard/view/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(response => {
                    alert("삭제 되었습니다.");
                    navigate("/home/recipe/전체");
                }).catch(err => {
                    console.log(err);
                });
        }
    }

    useEffect(() => {
        recommendCheck();
    }, [])

    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
        >
            <Card sx={{ width: 1000, padding: 5, textAlign: "center", marginBottom: 5 }}>
                {UserInfo.account.email === data.author ? (
                    <Typography variant="div">
                        <Button variant="outlined" size="small" component={RouterLink} to={`/home/recipe/board/modify/${recipeId}`}>
                            레시피 수정
                        </Button>&nbsp;
                        <Button color="error" variant="outlined" size="small" onClick={() => deleteRecipe(data.id)}>
                            레시피 삭제
                        </Button>&nbsp;
                    </Typography>
                ) : (null)}
                <CardMedia
                    sx={{ maxWidth: 600, margin: "auto", marginBottom: 5, marginTop: 3 }}
                    component="img"
                    height="400"
                    image={data.image}
                    alt="Paella dish"
                />
                <Stack direction="row" divider={<Divider orientation="vertical" flexItem sx={{ marginLeft: 2 }} />} alignItems="center" justifyContent="center" spacing={2}>
                    {data.nickname}
                    {likeCheck === true ? (<IconButton onClick={recommendClick}><FavoriteIcon color='error' /></IconButton>) : (<IconButton onClick={recommendClick}><FavoriteBorderIcon color='error' /></IconButton>)}
                </Stack>
                <Typography variant="h3" gutterBottom>
                    {data.title}
                </Typography>
                <Typography variant="body" sx={{ color: 'text.secondary', fontSize: 20 }}>
                    {data.recipeContents.introduce}
                    <br /><br />
                    난이도 : {data.level}
                </Typography>
            </Card>

            <Card sx={{ width: 1000, padding: 5, textAlign: "center", marginBottom: 5 }}>
                <Typography variant="h5" gutterBottom sx={{ color: 'text.secondary' }}>
                    요리소개
                </Typography>
                <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                    {data.recipeContents.introduce}
                </Typography>
                <Typography variant="body" gutterBottom>
                    태그 : {data.recipeContents.tag} &nbsp;&nbsp;
                </Typography>
                <Typography variant="body" gutterBottom>
                    팁 : {data.recipeContents.tag}
                </Typography>
            </Card>

            <Card sx={{ width: 1000, padding: 5, textAlign: "center", marginBottom: 5 }}>
                <ReactPlayer style={{ maxWidth: 600, margin: "auto", marginBottom: 5 }} url={data.recipeContents.video} />
            </Card>

            <Card sx={{ width: 1000, padding: 5, marginBottom: 5 }}>
                <Typography variant="h5">
                    재료
                </Typography>
                {data.ingredients.map((data, idx) => (
                    <Typography variant="body" sx={{ color: 'text.secondary', fontSize: 15 }} key={idx}>
                        {data.title} : {data.amount} <br />
                    </Typography>
                ))}
            </Card>

            <Card sx={{ width: 1000, padding: 5, marginBottom: 5 }}>
                <Typography variant="h5" sx={{ marginBottom: 3 }}>
                    요리순서
                </Typography>
                {data
                    .cookSteps
                    .sort((a, b) =>
                        a.step_no - b.step_no
                    )
                    .map((data, idx) => (
                        <Stack direction="row" justifyContent="space-between" mb={3} key={idx}>
                            <Typography variant="body" sx={{ color: 'text.secondary', fontSize: 25 }}>
                                {data.step_no} : {data.contents} <br /><br /><br />
                            </Typography>
                            <img src={data.image} alt={title} style={{ maxHeight: 250 }} />
                        </Stack>
                    ))}
            </Card>
        </Grid>
    );
}
