import React, { useState, useEffect, useContext, useRef } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import { Box, Link, Grid, Avatar, Typography } from '@mui/material';


let page = 0;

export default function RandomRecipe() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [ref, inView] = useInView();
    const getItems = (async () => {
        setLoading(true);
        await axios.get(`http://localhost:8080/api/home/recipe/${localStorage.getItem('authenticatedUser')}?page=${page}&size=4`, {
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

    useEffect(()=>{
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
            <Card sx={{ width: 700, marginBottom: 5}} ref={ref} key={idx}>
            <CardHeader
                avatar={
                    <Avatar src={data.authorprofile} alt="photoURL" />
                }
                title={data.title}
                sx={{ marginBottom: "15px" }}
            />
            <CardMedia
                component="img"
                height="450"
                image={data.recipeImage}
                alt="Paella dish"
            />
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
            </CardActions>
            <CardContent sx={{ textAlign: "left" }}>
                <Typography style={{ fontWeight: "bold", fontSize: "15px", marginBottom: 3 }}>좋아요 {data.recommend}개</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ display: "flex" }}>
                    <span style={{ fontWeight: "bold" }}>{data.recipeAuthor}</span> &nbsp;&nbsp; 
                    <span>{data.content}</span>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <span style={{ fontSize: "10px" }}>{data.recipeDate}</span>
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', marginTop: 2 }}>
                    <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField id="input-with-sx" label="댓글 달기" variant="standard" fullWidth />
                </Box>
            </CardContent>
        </Card>
        ))}
        </Grid>
    );
}