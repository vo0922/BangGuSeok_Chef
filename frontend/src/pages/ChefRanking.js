import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// material
import {
  Card,
  Stack,
  Avatar,
  ToggleButton,
  ToggleButtonGroup,
  Container,
  Typography,
  Badge,
  Grid,
  TextField,
  InputAdornment,
  Box
} from '@mui/material';
import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
// components
import Page from '../components/Page';
import ChefSearch from '../components/_dashboard/ChefRank/ChefSearch';
import { BaseUrlStore } from "../context/BaseUrlContext";
// ----------------------------------------------------------------------


export default function ChefRanking() {
  const BaseUrl = useContext(BaseUrlStore);
  const [buttonValue, setButtonValue] = useState('1');
  const [item, setItem] = useState();

  const buttonClick = (e, newValue) => {
    setButtonValue(newValue);
  }

  const getItem = async () => {
    await axios.get(`${BaseUrl.data.baseUrl}/api/rank/${buttonValue}?size=10&page=0`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => {
        setItem(response.data);
      }).catch(err => {
        console.log(err);
      });
  }

  useEffect(() => {
    getItem();
  }, [buttonValue]);

  return (
    <Page title="쉐프랭킹 | 방구석쉐프">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            쉐프 랭킹
          </Typography>
          <ToggleButtonGroup
            color="primary"
            value={buttonValue}
            exclusive
            onChange={buttonClick}
          >
            <ToggleButton value="1">추천 수</ToggleButton>
            <ToggleButton value="2">조회 수</ToggleButton>
            <ToggleButton value="3">팔로우 수</ToggleButton>
          </ToggleButtonGroup>
        </Stack>
        <Card>
          <ChefSearch />
          <Grid container>
            {item && item.map((data, idx) => (
              idx < 3 ? (
                <Grid item xs={4} key={idx}>
                  <Badge
                    color="secondary"
                    badgeContent={idx + 1}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'left'
                    }}
                    sx={{ margin: 4 }}
                  >
                    <Grid>
                      <Link to={`/home/userinformation/${data.email}`}>
                        <Avatar
                          alt="Remy Sharp"
                          src={data.profile}
                          sx={{ width: 150, height: 150, margin: 2 }}
                        />
                      </Link>
                      <Typography sx={{ textAlign: "center" }}>
                        {data.nickname}
                      </Typography>
                    </Grid>
                  </Badge>
                </Grid>
              ) : (
                <Grid item xs={3} key={idx}>
                  <Badge
                    color="secondary"
                    badgeContent={idx + 1}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'left'
                    }}
                    sx={{ margin: 4 }}
                  >
                    <Grid>
                      <Link to={`/home/userinformation/${data.email}`}>
                        <Avatar
                          alt="Remy Sharp"
                          src={data.profile}
                          sx={{ width: 100, height: 100, margin: 2 }}
                        />
                      </Link>
                      <Typography sx={{ textAlign: "center" }}>
                        {data.nickname}
                      </Typography>
                    </Grid>
                  </Badge>
                </Grid>
              )
            ))
            }
          </Grid>
        </Card>
      </Container>
    </Page>
  );
}
