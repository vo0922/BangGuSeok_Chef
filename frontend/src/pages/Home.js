import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
// material
import { Box, Grid, Container, Typography, Card } from '@mui/material';
// components
import Page from '../components/Page';
import Feed from '../components/_dashboard/app/Feed'
import RandomRecipe from '../components/_dashboard/app/RandomRecipe';

// ----------------------------------------------------------------------

export default function Home() {

  return (
    <Page title="홈 | Minimal-UI">
      <Container maxWidth="xl">
        <Grid>
          <Box sx={{ pb: 5 }}>
            <Typography variant="h4">방구석 셰프</Typography>
          </Box>
          <Card sx={{ width: "100%", padding: 5, marginBottom: 5 }}>
            <Typography variant="h6" sx={{ marginBottom: 5 }}>추천 메뉴!!</Typography>
            <RandomRecipe />
          </Card>
          <Card sx={{ width: "100%", padding: 5, alignItems:"center",justifyContent:"center",display:"flex", marginBottom: 5 }}>
            <Feed />
          </Card>
        </Grid>
      </Container>
    </Page>
  );
}
