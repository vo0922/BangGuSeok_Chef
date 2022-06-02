import React, { useEffect, useState } from 'react';

import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';

// material
import { Grid, Button, Container, Stack, Typography, Tab, Tabs, Box } from '@mui/material';
// components
import Page from '../components/Page';
import ChefSearch from '../components/_dashboard/ChefRank/ChefSearch';
import ChefMemberSearch from '../components/_dashboard/ChefRank/ChefMemberSearch';
//
import POSTS from '../_mocks_/blog';

// ----------------------------------------------------------------------


export default function ChefRankingSearch() {
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
        <Page title={`${keyWord} 검색 결과 | 방구석쉐프`}>
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
                    <Typography variant="h4" gutterBottom>
                        {keyWord} 검색 결과
                    </Typography>
                </Stack>

                <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
                    <ChefSearch posts={POSTS} />
                </Stack>

                <Grid container spacing={3}>
                    <ChefMemberSearch keyWord={keyWord} />
                </Grid>
            </Container>
        </Page>
    );
}
