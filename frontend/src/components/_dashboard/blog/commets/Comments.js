import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
// material
import { Grid, Button, Container, Stack, Typography, Card, Box, TextField, Avatar, Collapse } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import ReComments from './ReComments';
// components

// ----------------------------------------------------------------------


export default function Comments({ data, recipeDetail, UserInfo, postOwner }) {
    const [editable, setEditable] = useState({
        able: false,
    });

    const [reComments, setReComments] = useState(false);

    const editClick = (id) => {
        setEditable({
            able: true,
        });
    }

    const editComplete = async (e, commentid) => {
        setEditable({
            able: false,
        })
        await axios.put(`http://localhost:8080/api/recipeboard/comments/update`, {
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

    const onReComment = async (e, commentid) => {
        e.preventDefault();
        await axios.post("http://localhost:8080/api/recipeboard/recomments", {
            id: commentid,
            email: UserInfo.account.email,
            content: e.target.recomment.value
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                recipeDetail();
                e.target.recomment.value = "";
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const reCommentClick = () => {
        setReComments((prev) => !prev);
    }

    const cancel = () => {
        setEditable({
            able: false,
        })
    }

    const deleteComment = async (id) => {
        await axios.delete(`http://localhost:8080/api/recipeboard/comments/delete/${id}`, {
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
        <Card sx={{ margin: 1, padding: 2 }}>
            {editable.able ? (
                <form onSubmit={(e) => editComplete(e, data.id)}>
                    <Stack direction="row" alignItems="center" mb={2}>
                        <Avatar src={data.member.profile} alt="photoURL" />
                        &nbsp;&nbsp;
                        {data.member.nickname}
                    </Stack>
                    <TextField name="comment" fullWidth defaultValue={data.content} sx={{ color: 'text.secondary', fontSize: 18 }} />
                    <Typography variant="body" sx={{ color: 'text.secondary', fontSize: 12, float: "right", marginRight: 1, marginBottom: 1, marginTop: 1 }}>
                        <Button variant="outlined" size="small" type="submit">
                            수정
                        </Button>&nbsp;
                        <Button color="error" variant="outlined" size="small" onClick={cancel}>
                            취소
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
                    <Typography variant="body" sx={{ color: 'text.secondary', fontSize: 18 }}>
                        {data.content}
                    </Typography>

                    {UserInfo.account.email === data.member.email || UserInfo.account.email === postOwner ? (
                        <Typography variant="body" sx={{ color: 'text.secondary', fontSize: 12, float: "right", marginRight: 1, marginBottom: 1 }}>
                            <Button variant="outlined" size="small" onClick={() => editClick(data.id)}>
                                수정
                            </Button>&nbsp;
                            <Button color="error" variant="outlined" size="small" onClick={() => deleteComment(data.id)}>
                                삭제
                            </Button>&nbsp;
                            <Button color="secondary" variant="outlined" size="small" onClick={reCommentClick}>
                                답글
                            </Button>
                        </Typography>
                    ) : (
                        <Typography variant="body" sx={{ color: 'text.secondary', fontSize: 12, float: "right", marginRight: 1, marginBottom: 1 }}>
                            {UserInfo.account.email ? (
                                <Button color="secondary" variant="outlined" size="small" onClick={reCommentClick}>
                                    답글
                                </Button>) : (null)}
                        </Typography>
                    )}
                </Typography>
            )}
            <Grid container
                direction="row" justifyContent="center">
                <Collapse in={reComments}>
                    <form onSubmit={(e) => onReComment(e, data.id)}>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3} >
                            <Avatar src={UserInfo.account.photoURL} alt="photoURL" /> &nbsp;&nbsp;&nbsp;&nbsp;
                            <TextField label="답글 작성하기..." name="recomment" fullWidth size='small' sx={{width:600}}/> &nbsp;&nbsp;&nbsp;&nbsp;
                            <Button type="submit" size="small" variant="contained" style={{ float: "right" }}>
                                작성
                            </Button>
                        </Stack>
                    </form>
                </Collapse>
            </Grid>
            {data.reComments.map((data) => (
                <Stack direction="row"
                    alignItems="flex-start"
                    spacing={2}
                    sx={{ marginTop: 2 }}
                    key={data.id}>
                    <SubdirectoryArrowRightIcon sx={{color:"#bebebe"}}/>
                    <ReComments data={data} recipeDetail={recipeDetail} UserInfo={UserInfo} postOwner={postOwner} />
                </Stack>
            )
            )}
        </Card>
    );
}
