import React, { useEffect, useState } from 'react';

import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink ,useNavigate, useParams} from 'react-router-dom';

// material
import { Grid, Button, Container, Stack, Typography, Tab, Tabs, Box } from '@mui/material';
// components
import Page from '../components/Page';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../components/_dashboard/blog';
//
import POSTS from '../_mocks_/blog';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' }
];

// ----------------------------------------------------------------------

export default function Blog() {
  const navigate = useNavigate();
  const {search} = useParams();
  const [value, setValue] = useState("전체");
  useEffect(() => {
    if(search){
      setValue(search);
    }
  }, [value])
  const handleChange = (event, newValue) => {
    navigate(`/home/recipe/${newValue}`);
    setValue(newValue);
  };
  return (
    <Page title="Dashboard: Blog | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h4" gutterBottom>
            레시피
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
            New Post
          </Button>
        </Stack>

        <Box sx={{ bgcolor: 'background.paper', marginBottom: 5 }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            <Tab label="전체" value="전체" />
            <Tab label="탕" value="탕"/>
            <Tab label="전골" value="전골"/>
            <Tab label="찌개" value="찌개"/>
            <Tab label="국" value="국"/>
            <Tab label="볶음" value="볶음"/>
            <Tab label="면" value="면"/>
            <Tab label="밥" value="밥"/>
            <Tab label="반찬" value="반찬"/>
            <Tab label="안주" value="안주"/>
            <Tab label="주류" value="주류"/>
            <Tab label="튀김" value="튀김"/>
            <Tab label="제과" value="제과"/>
            <Tab label="제빵" value="제빵"/>
          </Tabs>
        </Box>

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSearch posts={POSTS} />
          <BlogPostsSort options={SORT_OPTIONS} />
        </Stack>

        <Grid container spacing={3}>
            <BlogPostCard search={search}/>
        </Grid>
        
      </Container>
    </Page>
  );
}
