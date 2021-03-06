import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
// material
import { Grid, Button, Container, Stack, Typography, Card, CardMedia, TextField, Avatar, FormControlLabel, Fade, Switch } from '@mui/material';

// components

// ----------------------------------------------------------------------


export default function ReComments({ data, recipeDetail, UserInfo, postOwner }) {
    const [editable, setEditable] = useState({
        able: false,
    });

    const editClick = (id) => {
        setEditable({
            able: true,
        });
    }

    const editComplete = async (e, commentid) => {
        setEditable({
            able: false,
        })
        await axios.put(`http://localhost:8080/api/recipeboard/recomments/update`, {
            id: commentid,
            content: e.target.comment.value
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                recipeDetail();
            }).catch(err => {
                console.log(err);
            });

    }

    const cancel = () => {
        setEditable({
            able: false,
        })
    }

    const deleteComment = async (id) => {
        await axios.delete(`http://localhost:8080/api/recipeboard/recomments/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                recipeDetail();
            }).catch(err => {
                console.log(err);
            });
    }

    return (
        <Card sx={{margin:2, padding:1, backgroundColor:"#f4f5f4", width:800}}>
            {editable.able? (
                    <form onSubmit={(e) => editComplete(e, data.id)}>
                        <Stack direction="row" alignItems="center" mb={2}>
                            <Avatar src={data.member.profile} alt="photoURL" />
                            &nbsp;&nbsp;
                            {data.member.nickname}
                        </Stack>
                        <TextField name="comment" fullWidth defaultValue={data.content} sx={{ color: 'text.secondary', fontSize: 15 }} />
                        <Typography variant="body" sx={{ color: 'text.secondary', fontSize: 12, float: "right", marginRight: 1, marginBottom: 1, marginTop: 1 }}>
                            <Button variant="outlined" size="small" type="submit">
                                ??????
                            </Button>&nbsp;
                            <Button color="error" variant="outlined" size="small" onClick={cancel}>
                                ??????
                            </Button>&nbsp;
                        </Typography>
                    </form>
            ) : (
                <Typography variant="body">
                    <Stack direction="row" alignItems="center" mb={1} justifyContent="space-between">
                        <Stack direction="row" alignItems="center" mb={1}>
                            <Avatar src={data.member.profile} alt="photoURL" />
                            &nbsp;&nbsp;
                            {data.member.nickname}
                        </Stack>
                    </Stack>
                    <Typography variant="body" sx={{ color: 'text.secondary', fontSize: 15 }}>
                        {data.content}
                    </Typography>

                    {UserInfo.account.email === data.member.email || UserInfo.account.email === postOwner ? (
                        <Typography variant="body" sx={{ color: 'text.secondary', fontSize: 8, float: "right", marginRight: 1, marginBottom: 1 }}>
                            <Button variant="outlined" size="small" onClick={() => editClick(data.id)}>
                                ??????
                            </Button>&nbsp;
                            <Button color="error" variant="outlined" size="small" onClick={() => deleteComment(data.id)}>
                                ??????
                            </Button>&nbsp;
                        </Typography>
                    ) : (
                        null
                    )}
                </Typography>
            )}
            </Card>
    );
}
