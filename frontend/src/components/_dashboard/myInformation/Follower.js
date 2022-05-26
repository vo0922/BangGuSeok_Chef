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


function createData(profileImage, nickname, email) {
  return { profileImage, nickname, email };
}

export default function Follower() {

  const [followerRender, setFollowerRender] = React.useState();
  const followedEmail = {
      followedEmail : localStorage.getItem('authenticatedUser')
  };

  async function getFollower(){  
    await axios.post(`http://localhost:8080/api/follower`, followedEmail, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      const rows = [];
      response.data.map((row) => (
          rows.push(createData(row.profile, row.nickname, row.email))
      ));

      setFollowerRender(
          rows.map((row) => (
              <TableRow key={row.email}>
                  <TableCell sx={{width:50}} component="th" scope="row">
                      <Avatar alt="profileImage" src={row.profileImage} />
                  </TableCell>
                  <TableCell component="th" scope="row" align='center'><Typography variant="h6">{row.nickname}</Typography></TableCell>
                  <TableCell component="th" scope="row"><Button onClick={() => onDelete(row.email)} variant="outlined">삭제</Button></TableCell>
              </TableRow>
          ))
      )

    }).catch(err => {
        console.log(err);
    });
  }

  async function onDelete(deleteEmail){
    const data = {
        followedEmail : localStorage.getItem('authenticatedUser'),
        followingEmail : deleteEmail
    }
  await axios.post(`http://localhost:8080/api/follow`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
     getFollower();
    }).catch(err => {
        console.log(err);
    });
}

  React.useEffect(() => {
    getFollower();
  }, [])
  
  
  return (
    <Container>
    <Card variant="outlined" sx={{ overflow: 'hidden' }} align="center">
      <TableContainer sx={{ maxHeight: 440, maxWidth:300 }}>
        <Table aria-label="Follower Table">
          <TableBody>
            {followerRender}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
    </Container>
  );
}
