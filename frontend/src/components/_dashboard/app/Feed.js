import React, { useState, useEffect, useContext, useRef } from 'react';
import {Link} from 'react-router-dom'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import ShareIcon from '@mui/icons-material/Share';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import { Box, Grid, Avatar, Typography, Button, Input, Stack } from '@mui/material';
import eyeFill from '@iconify/icons-eva/eye-fill';
import { Icon } from '@iconify/react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { fShortenNumber } from '../../../utils/formatNumber'
import { BaseUrlStore } from "../../../context/BaseUrlContext";


let page = 0;

export default function RandomRecipe() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [ref, inView] = useInView();
    const BaseUrl = useContext(BaseUrlStore);

    const getItems = (async () => {
        setLoading(true);
        await axios.get(`${BaseUrl.data.baseUrl}/api/home/recipe/${localStorage.getItem('authenticatedUser')}?page=${page}&size=4`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                if (!response.data.length) return;
                setItems(prevState => prevState.concat(response.data));
                // setPage(prevState => prevState + 1)
                page += 1;
                setLoading(false);
            }).catch(err => {
                console.log(err);
            });
    })

    const recommendClick = async (recipeId) => {
        await axios.get(`${BaseUrl.data.baseUrl}/api/recipeboard/view/like/?recipe_id=${recipeId}&email=${localStorage.getItem('authenticatedUser')}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                setItems(items.map(item => item.recipeId === recipeId ? { ...item, commendCheck: response.data, recommend: response.data === true ? item.recommend + 1 : item.recommend - 1 } : item))
            }).catch(err => {
                console.log(err);
            });
    }

    const onComment = async (e) => {
        e.preventDefault();
        if (!e.target.comment.value) {
            return alert("댓글을 적어주세요")
        }
        await axios.post(`${BaseUrl.data.baseUrl}/api/recipeboard/comments`, {
            id: e.target.recipeId.value,
            email: localStorage.getItem('authenticatedUser'),
            content: e.target.comment.value
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                alert("뎃글 등록 완료");
                setItems(items.map(item => item.recipeId === Number(e.target.recipeId.value) ? { ...item, comment: response.data.content } : item))
                e.target.comment.value = "";
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        page = 0;
        setItems([]);
        getItems();
    }, [])

    useEffect(() => {
        if (inView && !loading) {
            getItems();
        }
    }, [inView, loading])

    return (
        <Grid item>
            {items.map((data, idx) => (
                <Card sx={{ maxWidth: 600, marginBottom: 5 }} ref={ref} key={idx}>
                    <CardHeader
                        avatar={
                            <Link to={`/home/userinformation/${data.author}`}>
                            <Avatar src={data.authorprofile} alt="photoURL"/>
                            </Link>
                        }
                        title={<a href={`./recipe/board/${data.recipeId}`} style={{ textDecorationLine: "none", color: "black" }}>{data.title}</a>}
                        sx={{ marginBottom: "15px" }}
                    />
                    <CardMedia
                        component="img"
                        height="450"
                        image={data.recipeImage}
                        alt="Paella dish"
                    />
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites" onClick={() => recommendClick(data.recipeId)}>
                            {data.commendCheck === true ? (<FavoriteIcon />) : (<FavoriteBorderIcon />)}
                        </IconButton>
                    </CardActions>
                    <CardContent sx={{ textAlign: "left" }}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="flex-start"
                        >
                            <Typography style={{ fontWeight: "bold", fontSize: "15px", marginBottom: 3 }}>좋아요 {data.recommend}개</Typography>
                            <Stack direction="row">
                                <Box component={Icon} icon={eyeFill} color="text.secondary" />
                                <Typography variant="caption">&nbsp;{fShortenNumber(data.recipeClick)}</Typography>
                            </Stack>
                        </Stack>
                        <Typography variant="body2" color="text.secondary" sx={{ display: "flex" }}>
                            <span style={{ fontWeight: "bold" }}>{data.recipeAuthor}</span> &nbsp;&nbsp;
                            <span>{data.content}</span>
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
                            <span style={{ fontSize: "10px" }}>{data.recipeDate}</span>
                        </Typography>
                        {data.comment &&
                            <Typography variant="body2" color="text.secondary">
                                최근댓글 - <span style={{ fontSize: "10px" }}>{data.comment}</span>
                            </Typography>
                        }

                        <form onSubmit={onComment}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', marginTop: 2 }}>
                                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <Input name="recipeId" value={data.recipeId} type="hidden" />
                                <TextField id="input-with-sx" name="comment" label="댓글 달기" variant="standard" fullWidth />
                                <Button size="small" type="submit">
                                    전송
                                </Button>
                            </Box>
                        </form>
                    </CardContent>
                </Card>
            ))}
        </Grid>
    );
}