import React, {useEffect, useState, useCallback, useContext} from 'react';
import { useInView } from 'react-intersection-observer';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import { Link as RouterLink, useParams } from 'react-router-dom';
import axios from 'axios';
import shareFill from '@iconify/icons-eva/share-fill';
import messageCircleFill from '@iconify/icons-eva/message-circle-fill';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Link, Card, Grid, Avatar, Typography, CardContent, Stack } from '@mui/material';
// utils
import { fDate } from '../../../utils/formatTime';
import { fShortenNumber } from '../../../utils/formatNumber';
//
import SvgIconStyle from '../../SvgIconStyle';
import {BaseUrlStore} from "../../../context/BaseUrlContext";

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

export default function BlogPostCardSearch({ keyWord, valueSort }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ref, inView] = useInView();
  const BaseUrl = useContext(BaseUrlStore);
  const getItems = (async () => {
      setLoading(true);
      await axios.get(`${BaseUrl.data.baseUrl}/api/recipeboard/${keyWord}?page=${page}&size=8&sort=${valueSort},desc`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(response => {
          if (!response.data.length) return;
          setItems(prevState => prevState.concat(response.data));
          page += 1;
          setLoading(false);
        }).catch(err => {
          console.log(err);
        });
    
  })

  useEffect(() => {
    setItems([]);
    page = 0;
    getItems();
  }, [valueSort])
  

  useEffect(() => {
    if (inView && !loading) {
      getItems();
    }
  }, [inView, loading])

  return (
    items === null ? <div>검색결과가 없습니다.</div>: items.map((data) => (
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
                <Box component={Icon} icon={shareFill} sx={{ width: 16, height: 16, mr: 0.5 }} />
                <Typography variant="caption">{fShortenNumber(data.recommend)}</Typography>
              </Box>
            </InfoStyle>
          </CardContent>
        </Card>
      </Grid>
    ))
  );
}