import React, { useEffect, useState, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import { Link as RouterLink, useParams} from 'react-router-dom';
import axios from 'axios';
import shareFill from '@iconify/icons-eva/share-fill';
import messageCircleFill from '@iconify/icons-eva/message-circle-fill';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Link, Card, Grid, Avatar, Typography, CardContent } from '@mui/material';
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

export default function BlogPostCard({search }) {
  const [cards, setCards] = useState({
    body: ""
  });
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [ref, inView] = useInView();

  const getItems = useCallback(async () => {
    setLoading(true);
    await axios.get(`http://localhost:8080/api/recipeboard/?page=${page}&size=20&sort=id,desc`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      if(!response.data.length) return;
      setItems(prevState => prevState.concat(response.data));
      console.log(items);
      setLoading(false);
    }).catch(err => {
      console.log(err);
    });
    
  }, [page])

  useEffect(() =>{
    getItems()
  }, [getItems])

  useEffect(() => {
    if(inView && !loading){
      setPage(prevState => prevState + 1)
    }
  }, [inView, loading])


  return (
    items.map((data, idx) => (
      <Grid item xs={12} sm={3} md={3} key={idx}>
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
          src={data.image}
          sx={{}}
        />

        <CoverImgStyle alt={data.title} src="/static/mock-images/covers/cover_1.jpg" />
      </CardMediaStyle>

      <CardContent
        sx={{
          pt: 4
        }}
      >
        <Typography
          gutterBottom
          variant="caption"
          sx={{ color: 'text.disabled', display: 'block' }}
        >
          {data.lastupdated_date}
        </Typography>

        <TitleStyle
          to="#"
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
              <Typography variant="caption">{fShortenNumber(data.click)}</Typography>
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
