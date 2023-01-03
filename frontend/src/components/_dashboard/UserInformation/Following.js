import * as React from 'react';
import Card from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import { Link  } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { Button, Container } from '@mui/material';
import {BaseUrlStore} from "../../../context/BaseUrlContext";


function createData(profileImage, nickname, email) {
  return { profileImage, nickname, email };
}

export default function Following(followingUser) {
    const BaseUrl = React.useContext(BaseUrlStore);
  const [followingRender, setFollowingRender] = React.useState();
  const followingEmail = {
      followingEmail : followingUser.followingUser
  };

  async function getFollowing(){  
    await axios.post(`${BaseUrl.data.baseUrl}/api/following`, followingEmail, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      const rows = [];
      response.data.map((row) => (
          rows.push(createData(row.profile, row.nickname, row.email))
      ));

      setFollowingRender(
          rows.map((row) => (
              <TableRow key={row.email}>
                  <TableCell sx={{width:50}} component="th" scope="row">
                      <Avatar alt="profileImage" src={row.profileImage} />
                  </TableCell>
                  <TableCell component="th" scope="row" align='center'><a style={{textDecoration:"none", color:"blue"}} href={`/home/userinformation/${row.email}`}><Typography variant="h6">{row.nickname}</Typography></a></TableCell>
                  {followingEmail.followingEmail === localStorage.getItem('authenticatedUser') && <TableCell component="th" scope="row"><Button onClick={() => onDelete(row.email)} color="error">삭제</Button></TableCell>}
              </TableRow>
          ))
      )

    }).catch(err => {
        console.log(err);
    });
  }

  async function onDelete(deleteEmail){
      const data = {
          followedEmail : deleteEmail,
          followingEmail : localStorage.getItem('authenticatedUser')
      }
    await axios.post(`${BaseUrl.data.baseUrl}/api/follow`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => {
       getFollowing();
      }).catch(err => {
          console.log(err);
      });
  }

  React.useEffect(() => {
    getFollowing();
  }, [])
  
  
  return (
    <Container>
    <Card variant="outlined" sx={{ overflow: 'hidden' }} align="center">
      <TableContainer sx={{ maxHeight: 440, maxWidth:300 }}>
        <Table aria-label="Follower Table">
          <TableBody>
            {followingRender}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
    </Container>
  );
}
