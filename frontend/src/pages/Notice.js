import React from 'react'
import { Container, Typography } from '@mui/material'
import Page from '../components/Page'


export default function Notice() {
  return (
    <Page title="공지사항 | 방구석 쉐프">
      <Container>
        <Typography variant="h4" gutterBottom>
          공지사항
        </Typography>
        
      </Container>
    </Page>
  )
}
