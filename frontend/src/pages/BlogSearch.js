import React, { useEffect, useState } from 'react';

import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';

// material
import { Grid, Button, Container, Stack, Typography, Tab, Tabs, Box } from '@mui/material';
// components
import Page from '../components/Page';
import { BlogPostsSort, BlogPostsSearch } from '../components/_dashboard/blog';
import BlogPostCardSearch from '../components/_dashboard/blog/BlogPostCardSearch';
//
import POSTS from '../_mocks_/blog';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
    { value: 'id', label: '최신순' },
    { value: 'click', label: '인기순' },
    { value: 'recommend', label: '조회순' }
];

// ----------------------------------------------------------------------

export default function BlogSearch() {
    const navigate = useNavigate();
    const keyWord = useParams().search;
    const [valuesort, setValueSort] = useState("id");

    const onSort = (e) => {
        setValueSort(e.target.value);
    }

    useEffect(() => {
        console.log(keyWord);
    }, [])

    return (
        <Page title="Dashboard: Blog | Minimal-UI">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
                    <Typography variant="h4" gutterBottom>
                        {keyWord} 검색 결과
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

                <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
                    <BlogPostsSearch posts={POSTS} />
                    <BlogPostsSort options={SORT_OPTIONS} onSort={onSort} valueSort={valuesort} />
                </Stack>

                <Grid container spacing={3}>
                    <BlogPostCardSearch keyWord={keyWord} valueSort={valuesort} />
                </Grid>
            </Container>
        </Page>
    );
}
