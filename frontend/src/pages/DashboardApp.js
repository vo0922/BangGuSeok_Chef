import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
// material
import { Box, Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import {
  AppTasks,
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppNewsUpdate,
  AppWeeklySales,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates
} from '../components/_dashboard/app';
import RandomRecipe from '../components/_dashboard/app/RandomRecipe';

// ----------------------------------------------------------------------

export default function DashboardApp() {

  return (
    <Page title="Dashboard | Minimal-UI">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">방구석 셰프</Typography>
        </Box>
        <Typography variant="h6" sx={{ marginBottom: 5 }}>오늘의 메뉴!!</Typography>
        <Grid container spacing={3}>
          <RandomRecipe />
        </Grid>
        <Grid item xs={12} sm={6} md={12}>
          <Typography variant="h6">인기 차트</Typography>
        </Grid>
      </Container>
    </Page>
  );
}
