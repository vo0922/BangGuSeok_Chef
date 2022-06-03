import * as React from 'react';
import Card from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { Link  } from 'react-router-dom';


const columns = [
  { id: 'id', label: '번호', minWidth: 70 },
  { id: 'title', label: '레시피 제목', minWidth: 400 },
  { id: 'category', label: '카테고리', minWidth: 100 },
  { id: 'click', label: '조회수', minWidth: 80 },
  { id: 'lastupdatedDate', label: '최종수정일', minWidth: 120 }
];

function createData(id, title, category, click, lastupdatedDate) {
  return { id, title, category, click, lastupdatedDate };
}

export default function MyPosts(userEmail) {

  const [postRender, setPostRender] = React.useState();

  async function getMyposts(){  
    await axios.get(`http://localhost:8080/api/myinformation/posts/${userEmail.userEmail}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      const rows = [];
      response.data.map((row) => (
          rows.push(createData(row.id, row.title, row.category, row.click, row.lastupdatedDate.split('T')[0]))
      ));

      setPostRender([
        rows.map((row) => (
            <TableRow key={row.id}>
                <TableCell component="th" scope="row">{row.id}</TableCell>
                <TableCell component="th" scope="row"><Link style={{textDecoration:"none", color:"blue"}} to={"/home/recipe/board/".concat(row.id)}>{row.title}</Link></TableCell>
                <TableCell component="th" scope="row">{row.category}</TableCell>
                <TableCell component="th" scope="row">{row.click}</TableCell>
                <TableCell component="th" scope="row">{row.lastupdatedDate}</TableCell>
            </TableRow>
        ))
      ])

    }).catch(err => {
        console.log(err);
    });
  }

  React.useEffect(() => {
    getMyposts();
  }, [])
  
  
  return (
    <Card sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="My Posts Table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {postRender}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
