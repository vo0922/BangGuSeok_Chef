import React from 'react'
import { Container, Typography, Tabs, Tab, Box } from '@mui/material'
import { useParams } from 'react-router-dom';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import Page from '../components/Page'
import Information from '../components/_dashboard/UserInformation/Information'
import UserPosts from '../components/_dashboard/UserInformation/UserPosts'
import FollowButton from '../components/_dashboard/UserInformation/FollowButton';
import Follower from '../components/_dashboard/UserInformation/Follower';
import Following from '../components/_dashboard/UserInformation/Following';

export default function UserInformation() {
  const userEmail = useParams().email;
  const [tabValue, setTabValue] = React.useState('1');

  const tabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Page title="유저 정보 | 방구석 쉐프">
      <Container>
        <Typography variant="h4" gutterBottom>
            유저 정보
        </Typography>
        
        <Information userEmail={userEmail}/>

        <TabContext value={tabValue}>
          <Box sx={{borderBottom: 2, borderColor: 'divider', marginTop:3 }} alignContent="center"  >
            <TabList onChange={tabChange} aria-label="information Tab" centered >
              <Tab label="레시피" value='1'/>
              <Tab label="팔로워" value='2'/>
              <Tab label="팔로잉" value='3'/>
            </TabList>
          </Box>
          <TabPanel value="1"><UserPosts userEmail={userEmail}/></TabPanel>
          <TabPanel value="2"><Follower followedUser={userEmail}/></TabPanel> 
          <TabPanel value="3"><Following followingUser={userEmail}/></TabPanel>
        </TabContext>
        
      </Container>
    </Page>
  )
}
