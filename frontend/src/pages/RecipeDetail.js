import React, { useState, useEffect, useContext } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ReactPlayer from 'react-player';
// material
import { Grid, Button, Container, Stack, Typography, Card, CardMedia, TextField, Avatar, FormControlLabel, Fade, Switch } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// components
import Comments from '../components/_dashboard/blog/commets/Comments';
import Page from '../components/Page';
import { UserInfoContextStore } from '../context/UserInfoContext';


// ----------------------------------------------------------------------

export default function RecipeDetail() {
    const navigate = useNavigate();
    const UserInfo = useContext(UserInfoContextStore);

    const [title, setTitle] = useState("");
    const [postOwner, setpostOwner] = useState("");

    const [contents, setContents] = useState("");
    const [comments, setComments] = useState([]);

    const recipeId = useParams().key;
    const onComment = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8080/api/recipeboard/comments", {
            id: recipeId,
            email: UserInfo.account.email,
            content: e.target.comment.value
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                recipeDetail();
                e.target.comment.value = "";
            })
            .catch((error) => {
                console.log(error);
            })
    }


    const deleteRecipe = async (id) => {
        await axios.delete(`http://localhost:8080/api/recipeboard/view/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                navigate("/home/recipe/전체");
            }).catch(err => {
                console.log(err);
            });
    }

    const goBack = () => {
        navigate(-1);
    }

    const recipeDetail = async () => {
        await axios.get(`http://localhost:8080/api/recipeboard/view/${recipeId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                setpostOwner(response.data.author)
                setTitle(response.data.title)
                setContents(
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="flex-start"
                    >
                        <Card sx={{ width: 1000, padding: 5, textAlign: "center", marginBottom: 5 }}>
                            {UserInfo.account.email === response.data.author ? (
                                <Typography variant="div">
                                    <Button variant="outlined" size="small">
                                        레시피 수정
                                    </Button>&nbsp;
                                    <Button color="error" variant="outlined" size="small" onClick={() => deleteRecipe(response.data.id)}>
                                        레시피 삭제
                                    </Button>&nbsp;
                                </Typography>
                            ) : (null)}
                            <CardMedia
                                sx={{ maxWidth: 600, margin: "auto", marginBottom: 5 }}
                                component="img"
                                height="400"
                                image={response.data.image}
                                alt="Paella dish"
                            />
                            <Typography variant="h3" gutterBottom>
                                {response.data.title}
                            </Typography>
                            <Typography variant="body" sx={{ color: 'text.secondary', fontSize: 20 }}>
                                {response.data.recipeContents.introduce}
                                <br /><br />
                                난이도 : {response.data.level}
                            </Typography>
                        </Card>


                        <Card sx={{ width: 1000, padding: 5, textAlign: "center", marginBottom: 5 }}>
                            <ReactPlayer style={{ maxWidth: 600, margin: "auto", marginBottom: 5 }} url={response.data.recipeContents.video} />
                        </Card>

                        <Card sx={{ width: 1000, padding: 5, marginBottom: 5 }}>
                            <Typography variant="h5">
                                재료
                            </Typography>
                            {response.data.ingredients.map((data) => (
                                <Typography variant="body" sx={{ color: 'text.secondary', fontSize: 15 }} key={data.id}>
                                    {data.title} : {data.amount} <br />
                                </Typography>
                            ))}
                        </Card>

                        <Card sx={{ width: 1000, padding: 5, marginBottom: 5 }}>
                            <Typography variant="h5" sx={{marginBottom: 3}}>
                                요리순서
                            </Typography>
                            {response.data.cookSteps.map((data) => (
                                <Stack direction="row" justifyContent="space-between" mb={3} key={data.id}>
                                <Typography variant="body" sx={{ color: 'text.secondary', fontSize: 25 }}>
                                    {data.step_no} : {data.contents} <br /><br /><br />
                                </Typography>
                                <img src={data.image} alt={title} style={{maxHeight:250}}/>
                                </Stack>
                            ))}
                        </Card>
                    </Grid>
                )
                setComments(
                    response.data.comments
                )
            })
            .catch(err => {
                navigate("/home/recipe/전체");
            });
    }

    useEffect(() => {
        recipeDetail();
    }, [])

    return (
        <Page title={`${title} | 방구석 쉐프`}>
            <Container>
                <Button variant="contained" startIcon={<ArrowBackIcon />} style={{ marginBottom: 10 }} onClick={goBack}>
                    뒤로가기
                </Button>

                {contents}
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="flex-start"
                >
                    <Card sx={{ width: 1000, padding: 5 }}>
                        <form onSubmit={onComment}>
                            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
                                <Avatar src={UserInfo.account.photoURL} alt="photoURL" /> &nbsp;&nbsp;&nbsp;&nbsp;
                                <TextField label="댓글 작성하기..." name="comment" fullWidth />
                            </Stack>
                            <Button type="submit" variant="contained" endIcon={<SendIcon />} style={{ float: "right" }}>
                                작성하기
                            </Button>
                        </form>
                        <br />
                        <br />
                        {comments.map((data) => (
                            <Comments data={data} recipeDetail={recipeDetail} UserInfo={UserInfo} postOwner={postOwner} key={data.id}/>
                        )
                        )}
                    </Card>
                </Grid>
            </Container>
        </Page>
    );
}
