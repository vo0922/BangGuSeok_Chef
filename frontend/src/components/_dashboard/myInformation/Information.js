import * as React from 'react';
import { Grid, Table, TableBody, TableCell, TableRow, Avatar } from '@mui/material';
import axios from 'axios';
import { UserInfoContextStore } from '../../../context/UserInfoContext';


function createData(name, data) {
  return { name, data };
}

export default function Information() {
  const UserInfo = React.useContext(UserInfoContextStore);
  const [informationRender, setInformationRender] = React.useState();
  const [avatarRender, setAvatarRender] = React.useState();

  async function getInformation(){
    console.log(UserInfo.account.email);
    await axios.get(`http://localhost:8080/api/myinformation/${UserInfo.account.email}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      console.log(response);
      const rows = [  
        createData('닉네임', response.data.nickname),
        createData('성별', response.data.gender ? response.data.gender : "성별미지정"),
        createData('연령대', response.data.age !== 0 ? response.data.age : "연령대 미지정"),
        createData('게시글 수', response.data.postCount),
        createData('총 조회수', response.data.postView),
        createData('총 추천수', response.data.recommendCount),
        createData('팔로워 수', 500)
      ];
      setInformationRender([
        <Table key={response.data.email} sx={{ minWidth : 300 }} aria-label="information">    
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.name} >
                      <TableCell align="center" component="th" scope="row" sx={{width : "40%"}}>
                        {row.name}
                      </TableCell>              
                      <TableCell align="center">{row.data}</TableCell>              
                    </TableRow>))}
                </TableBody>
            </Table>
      ])
      setAvatarRender([
        <Avatar
          key={response.data.profile}
            alt="Profile Image"
            src={response.data.profile}
            sx={{ width: "80%", height:"80%"}}
        />      
      ])
      

    }).catch(err => {
        console.log(err);
  });
  };
  
  React.useEffect(() => {
   getInformation(); 
   console.log(UserInfo);
   
  }, [])
    

  return (
    <Grid container alignItems="center" justifyContent="center" spacing={3} marginTop={5}>
        <Grid item xs={12} md={3} alignItems="center" justifyContent="center">
            {avatarRender}
        </Grid>
        <Grid item xs={12} md={9}>
            {informationRender}
        </Grid>
    </Grid>
  );
}