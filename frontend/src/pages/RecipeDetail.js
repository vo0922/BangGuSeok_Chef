import React, { useState, useEffect, useContext } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ReactPlayer from 'react-player';
// material
import { Grid, Button, Container, Stack, Typography, Card, CardMedia, TextField, Avatar, Divider } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// components
import Comments from '../components/_dashboard/blog/comments/Comments';
import Page from '../components/Page';
import { UserInfoContextStore } from '../context/UserInfoContext';
import BlogPostContent from '../components/_dashboard/blog/BlogPostContent'
// ----------------------------------------------------------------------

export default function RecipeDetail() {
    const navigate = useNavigate();
    const UserInfo = useContext(UserInfoContextStore);

    const [title, setTitle] = useState("");
    const [postOwner, setpostOwner] = useState("");

    const [contents, setContents] = useState({
        ingredients:[[]],
        cookSteps:[[]],
        recipeContents:[],
    });

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
                setContents(response.data)
                setComments(response.data.comments)
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
                <BlogPostContent data={contents} UserInfo={UserInfo} recipeId={recipeId} title={title}/>
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
