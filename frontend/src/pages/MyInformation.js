import React from 'react'
import { Container, Typography, Tabs, Tab, Box } from '@mui/material'
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import Page from '../components/Page'
import Information from '../components/_dashboard/myInformation/Information'
import MyPosts from '../components/_dashboard/myInformation/MyPosts'
import FollowButton from '../components/_dashboard/myInformation/FollowButton';
import Follower from '../components/_dashboard/myInformation/Follower';
import Following from '../components/_dashboard/myInformation/Following';

export default function MyInformation() {
  const [tabValue, setTabValue] = React.useState('1');

  const tabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Page title="내 정보 | 방구석 쉐프">
      <Container>
        <Typography variant="h4" gutterBottom>
            내 정보
        </Typography>
        
        <Information/>

        <TabContext value={tabValue}>
          <Box sx={{borderBottom: 2, borderColor: 'divider', marginTop:3 }} alignContent="center"  >
            <TabList onChange={tabChange} aria-label="information Tab" centered >
              <Tab label="레시피" value='1'/>
              <Tab label="팔로워" value='2'/>
              <Tab label="팔로잉" value='3'/>
            </TabList>
          </Box>
          <TabPanel value="1"><MyPosts/></TabPanel>
          <TabPanel value="2"><Follower/></TabPanel>
          <TabPanel value="3"><Following/></TabPanel>
        </TabContext>
        
      </Container>
    </Page>
  )
}
