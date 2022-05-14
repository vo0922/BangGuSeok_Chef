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
  arrows: true,
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
  const randomgetimg = async () => {
    await axios.get(`http://localhost:8080/api/recipeboard/category/${categoryRandom[randomInt]}?page=0&size=3&sort=recommend,desc`, {
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
        <Avatar alt={categoryRandom[randomInt]} src={`/img/main_image/${categoryRandom[randomInt]}.jpg`} style={{width:250, height:250}} onClick={menuimgClick} />
      {randomItem.map((data) => (
        <Grid item xs={12} sm={12} md={3} key={data.id} >
          <Card sx={{ maxHeight: 300, maxWidth: 600}} >
            <CardMediaStyle
              sx={{
                '&:after': {
                  top: 0,
                  content: "''",
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
                }
              }}
            >
              <CoverImgStyle alt={data.title} src={data.image} />
            </CardMediaStyle>

            <CardContent
              sx={{
                pt: 4,
                bottom: 0,
                width: '100%',
                position: 'absolute'
              }}
            >
              <Typography
                gutterBottom
                variant="caption"
                sx={{ color: 'text.disabled', display: 'block' }}
              >
                {data.nickname}
              </Typography>

              <TitleStyle
                to="#"
                color="inherit"
                variant="subtitle2"
                underline="hover"
                component={RouterLink}
                sx={{
                  typography: 'h5',
                  color: 'common.white'
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
      ))}
    </Grid>
  );
}