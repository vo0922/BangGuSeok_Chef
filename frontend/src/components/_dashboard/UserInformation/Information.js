import * as React from 'react';
import { Grid, Table, TableBody, TableCell, TableRow, Avatar, Stack, Typography, Button } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
import FollowButton from './FollowButton';
import {BaseUrlStore} from "../../../context/BaseUrlContext";

function createData(name, data) {
  return { name, data };
}

export default function Information(userEmail) {
  const [informationRender, setInformationRender] = React.useState();
  const [avatarRender, setAvatarRender] = React.useState();
  const BaseUrl = React.useContext(BaseUrlStore);

  async function getInformation(){
    await axios.get(`${BaseUrl.data.baseUrl}/api/myinformation/${userEmail.userEmail}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      setInformationRender([
        <Stack spacing={2} key={userEmail.userEmail}>
          <Stack direction="row" spacing={5}>
            <Typography variant='h4'>{response.data.nickname}</Typography>
            {userEmail.userEmail === localStorage.getItem('authenticatedUser') && 
            <Button variant='outlined' size='small'>
              <Link to="/home/myinformation/update" style={{textDecoration:"none", color:"primary"}}>프로필 수정</Link>
            </Button>}
            <FollowButton followedUser={userEmail.userEmail}/>
          </Stack>
          <Stack direction="row" spacing={7} sx={{paddingTop : 3}}>
            <Typography variant='subtitle1'>레시피 {response.data.postCount}</Typography>
            <Typography variant='subtitle1'>조회수 {response.data.postView}</Typography>
            <Typography variant='subtitle1'>추천수 {response.data.recommendCount}</Typography>
            <Typography variant='subtitle1'>팔로워 {response.data.followerCount}</Typography>
            <Typography variant='subtitle1'>팔로잉 {response.data.followingCount}</Typography>
          </Stack>
          <Typography variant='body2'>{response.data.introduce}</Typography>
        </Stack>
      ])

      setAvatarRender([
        <Avatar
          key={response.data.profile}
            alt="Profile Image"
            src={response.data.profile}
            sx={{ width: "80%", height:"auto"}}
        />      
      ])
      

    }).catch(err => {
        console.log(err);
  });
  };
  
  React.useEffect(() => {
   getInformation(); 
  }, [])
    

  return (
    <Grid container justifyContent="center" spacing={3} marginTop={5}>
        <Grid item xs={12} md={3} alignItems="center" justifyContent="center">
            {avatarRender}
        </Grid>
        <Grid item xs={12} md={9}>
            {informationRender}
        </Grid>
    </Grid>
  );
}