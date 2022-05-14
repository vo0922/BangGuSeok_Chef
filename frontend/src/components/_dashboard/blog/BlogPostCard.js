import React, { useEffect, useState, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import { Link as RouterLink, useParams } from 'react-router-dom';
import axios from 'axios';
import heartfill from '@iconify/icons-eva/heart-fill';
import messageCircleFill from '@iconify/icons-eva/message-circle-fill';

// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Link, Card, Grid, Stack, Avatar, Typography, CardContent } from '@mui/material';
// utils
import { fDate } from '../../../utils/formatTime';
import { fShortenNumber } from '../../../utils/formatNumber';
//
import SvgIconStyle from '../../SvgIconStyle';

// ----------------------------------------------------------------------

const CardMediaStyle = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)'
});

const TitleStyle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical'
});

const AvatarStyle = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2)
}));

const InfoStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled
}));

const CoverImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

let page = 0;

export default function BlogPostCard({ category, valueSort }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ref, inView] = useInView();

  const getItems = (async () => {
    if (category === "전체") {
      setLoading(true);
      await axios.get(`http://localhost:8080/api/recipeboard/?page=${page}&size=8&sort=${valueSort},desc`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(response => {
          if (!response.data.length) return;
          setItems(prevState => prevState.concat(response.data));
          // setPage(prevState => prevState + 1)
          page += 1;
          setLoading(false);
        }).catch(err => {
          console.log(err);
        });
    } else {
      setLoading(true);
      await axios.get(`http://localhost:8080/api/recipeboard/category/${category}?page=${page}&size=8&sort=${valueSort},desc`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(response => {
          if (!response.data.length) return;
          setItems(prevState => prevState.concat(response.data));
          // setPage(prevState => prevState + 1)
          page += 1;
          setLoading(false);
        }).catch(err => {
          console.log(err);
        });
    }
  })

  useEffect(() => {
    setItems([]);
    // setPage(prevState => 0);
    page = 0;
    getItems();
  }, [category, valueSort])


  useEffect(() => {
    if (inView && !loading) {
      getItems();
    }
  }, [inView, loading])

  return (
    items.map((data) => (
      <Grid item xs={12} sm={3} md={3} key={data.id}>
        <Card sx={{ position: 'relative' }} ref={ref} >
          <CardMediaStyle
            sx={{}}
          >
            <SvgIconStyle
              color="paper"
              src="/static/icons/shape-avatar.svg"
              sx={{
                width: 80,
                height: 36,
                zIndex: 9,
                bottom: -15,
                position: 'absolute',
              }}
            />
            <AvatarStyle
              alt={data.title}
              src={data.member}
              sx={{}}
            />

            <CoverImgStyle alt={data.title} src={data.image} />
          </CardMediaStyle>

          <CardContent
            sx={{
              pt: 4
            }}
          >
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
              <Typography
                gutterBottom
                variant="caption"
                sx={{ color: 'text.disabled', display: 'block' }}>
                {data.nickname}
              </Typography>
              <Typography
                gutterBottom
                variant="caption"
                sx={{ color: 'text.disabled', display: 'block' }}
              >
                {data.lastupdatedDate.split('T')[0]}
              </Typography>
            </Stack>
            <TitleStyle
              to={`/home/recipe/board/${data.id}`}
              color="inherit"
              variant="subtitle2"
              underline="hover"
              component={RouterLink}
              sx={{

              }}
            >
              {data.title}
            </TitleStyle>

            <InfoStyle>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  ml: 1.5
                }}
              >
                <Box component={Icon} icon={messageCircleFill} sx={{ width: 16, height: 16, mr: 0.5 }} />
                <Typography variant="caption">{fShortenNumber(data.comment)}</Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  ml: 1.5
                }}
              >
                <Box component={Icon} icon={eyeFill} sx={{ width: 16, height: 16, mr: 0.5 }} />
                <Typography variant="caption">{fShortenNumber(data.click)}</Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  ml: 1.5
                }}
              >
                <Box component={Icon} icon={heartfill} sx={{ width: 16, height: 16, mr: 0.5 }} />
                <Typography variant="caption">{fShortenNumber(data.recommend)}</Typography>
              </Box>
            </InfoStyle>
          </CardContent>
        </Card>
      </Grid>
    ))
  );
}