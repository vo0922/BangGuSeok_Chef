import * as React from 'react';
import { Grid, Table, TableBody, TableCell, TableRow, Avatar, Stack, Typography, Button } from '@mui/material';
import axios from 'axios';

function createData(name, data) {
  return { name, data };
}

export default function Information() {
  const [informationRender, setInformationRender] = React.useState();
  const [avatarRender, setAvatarRender] = React.useState();

  async function getInformation(){
    await axios.get(`http://localhost:8080/api/myinformation/${localStorage.getItem('authenticatedUser')}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      setInformationRender([
        <Stack spacing={2}>
          <Stack direction="row" spacing={5}>
            <Typography variant='h4'>{response.data.nickname}</Typography>
            <Button variant='outlined' size='small'>프로필 수정</Button>
          </Stack>
          <Stack direction="row" spacing={7} sx={{paddingTop : 3}}>
            <Typography variant='subtitle1'>레시피 {response.data.postCount}</Typography>
            <Typography variant='subtitle1'>조회수 {response.data.postView}</Typography>
            <Typography variant='subtitle1'>추천수 {response.data.recommendCount}</Typography>
            <Typography variant='subtitle1'>팔로워  500</Typography>
            <Typography variant='subtitle1'>팔로잉  800</Typography>
          </Stack>
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