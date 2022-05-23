import React from 'react'
import { Container, Typography } from '@mui/material'
import Page from '../components/Page'
import Information from '../components/_dashboard/myInformation/Information'
import Posts from '../components/_dashboard/myInformation/Posts'

export default function MyInformation() {

  return (
    <Page title="내 정보 | 방구석 쉐프">
      <Container>
        <Typography variant="h4" gutterBottom>
            내 정보
        </Typography>
        
        <Information/>

        <Typography variant="h4" gutterBottom sx={{marginTop:5, marginBottom:5}}>
            내 게시물
        </Typography>
        <Posts/>
      </Container>
    </Page>
  )
}
