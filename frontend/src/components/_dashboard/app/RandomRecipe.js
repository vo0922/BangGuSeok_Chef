import React, { useEffect, useState, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import { Link as RouterLink, useParams } from 'react-router-dom';
import axios from 'axios';
import shareFill from '@iconify/icons-eva/share-fill';
import messageCircleFill from '@iconify/icons-eva/message-circle-fill';
import Slider from "react-slick";
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Link, Card, Grid, Stack, Avatar, Typography, CardContent } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
//
import SvgIconStyle from '../../SvgIconStyle';
import "./slick.css";
import "slick-carousel/slick/slick-theme.css";

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
const settings = {
  arrows:true,
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};
export default function RandomRecipe() {
  const categoryRandom = ["탕", "전골", "찌개", "국", "볶음", "면", "밥", "반찬", "안주", "주류", "튀김", "제과", "제빵"]
  const [randomInt, setRandomInt] = useState(0);
  const [randomItem, setRandomItem] = useState([]);
  const getRandomIndex = function (max) {
    return Math.floor(Math.random() * (max - 0)) + 0;
  }
  const menuimgClick = () => {
    setRandomInt(getRandomIndex(categoryRandom.length))
  }
  const randomgetimg = async() => {
    await axios.get(`http://localhost:8080/api/recipeboard/category/${categoryRandom[randomInt]}?page=0&size=4&sort=recommend,desc`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(response => {
          setRandomItem(      
            response.data
            )
        }).catch(err => {
          console.log(err);
        });
    }
  
  useEffect(() => {
    setRandomInt(getRandomIndex(categoryRandom.length))
  }, [])

  useEffect(() => {
    randomgetimg()
  }, [randomInt])

  return (
    <Grid container spacing={3}>
    <Grid item xs={12} sm={6} md={3}>
    <Typography variant="body" onClick={menuimgClick}>
      <img src={`/img/main_image/${categoryRandom[randomInt]}.jpg`} style={{ borderRadius: "70%" }} height="200" width="200" alt={categoryRandom[randomInt]} />
    </Typography>
    </Grid>
    <Grid item xs={12} sm={6} md={9}>
    <Stack direction="row" spacing={3}>
    {randomItem.map((data) => (
      <Card sx={{ position: 'relative', borderRadius:"20%" }} key={data.id}>
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

        >
          <Typography
              gutterBottom
              variant="caption"
              sx={{ color: 'text.disabled', display: 'block' }}>
              {data.nickname}
            </Typography>
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
    ))} 
    </Stack>
    </Grid>
    </Grid>
  );
}