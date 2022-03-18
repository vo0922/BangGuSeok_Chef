import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  ButtonGroup,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  Badge,
  TableContainer,
  TablePagination
} from '@mui/material';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../components/_dashboard/user';
//
import USERLIST from '../_mocks_/user';

// ----------------------------------------------------------------------


export default function ChefRanking() {
  const [selected, setSelected] = useState([]);
  const [filterName, setFilterName] = useState('');


  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };



  return (
    <Page title="쉐프랭킹 | 방구석쉐프">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            쉐프 랭킹
          </Typography>
          <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button to="#">추천 수</Button>
          <Button to="#">게시글 수</Button>
          <Button to="#">조회 수</Button>
          </ButtonGroup>
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <Badge 
              color="secondary" 
              badgeContent="0"
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              sx={{margin:10}}
            >
              <Avatar
                alt="Remy Sharp"
                src=""
                sx={{ width: 200, height: 200 }}
              />
            </Badge>
          </Scrollbar>
        </Card>
      </Container>
    </Page>
  );
}
