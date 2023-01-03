import React, { useEffect, useState, useCallback, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// material
import { Box, Card, Grid, Avatar, Typography, CardContent, Stack, Badge } from '@mui/material';
import {BaseUrlStore} from "../../../context/BaseUrlContext";

export default function ChefMemberSearch({ keyWord }) {
  const [items, setItems] = useState([]);
  const BaseUrl = useContext(BaseUrlStore);
  const getItems = (async () => {
    await axios.get(`${BaseUrl.data.baseUrl}/api/rank/search/${keyWord}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(response => {
            console.log(response);
        setItems(response.data);
        }).catch(err => {
          console.log(err);
        });
  })

  useEffect(() => {
    getItems();
  }, [])

  return (
    items === null ? <div>검색결과가 없습니다.</div> : items.map((data, idx) => (
        <Grid item xs={3} key={idx}>
        <Badge
          color="secondary"
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
    ))
  );
}