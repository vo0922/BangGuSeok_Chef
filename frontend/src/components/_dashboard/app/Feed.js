import React, { useState, useEffect, useContext, useRef } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import TextField from '@mui/material/TextField';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import AccountCircle from '@mui/icons-material/AccountCircle';

export default function RandomRecipe() {

    return (
        <Card sx={{ maxWidth: 700 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" />
                }
                title="레시피 제목"
                sx={{ marginBottom: "15px" }}
            />
            <CardMedia
                component="img"
                height="450"
                image="https://recipeboard-image.s3.ap-northeast-2.amazonaws.com/boardimage/bbf9203c-7b34-4181-952c-b6459ad6f36a%EC%95%88%EC%A3%BC.jpg"
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
                <p style={{ fontWeight: "bold", fontSize: "15px", marginBottom: 3 }}> 좋아요 1개</p>
                <Typography variant="body2" color="text.secondary" sx={{ display: "flex" }}>
                    <p style={{ fontWeight: "bold" }}> 작성자</p> &nbsp;&nbsp; <p> 작성자글 </p>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <p style={{ fontSize: "10px" }}> 1시간 전</p>
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', marginTop: 2 }}>
                    <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField id="input-with-sx" label="댓글 달기" variant="standard" fullWidth />
                </Box>
            </CardContent>
        </Card>
    );
}