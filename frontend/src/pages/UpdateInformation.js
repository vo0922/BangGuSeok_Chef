import React from 'react'
import { Container, Typography, Avatar, Card, Stack, Button, TextField, Grid, FormControl, MenuItem, Select, InputLabel, Input } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Page from '../components/Page'



export default function UpdateInformation() {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('authenticatedUser');
  const [userData, setUserData] = React.useState()

  const [imageSrc, setImageSrc] = React.useState();
  const encodeFileToBase64 = (fileBlob, idx) => {
    if(fileBlob){
      const reader = new FileReader();
      reader.readAsDataURL(fileBlob);
      return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      }
    })
    }
  }

  async function getInformation(){
    console.log(userEmail);
    await axios.get(`http://localhost:8080/api/${userEmail}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      setUserData({
        email : userEmail,
        nickname : response.data.nickname,
        profile : response.data.profile,
        age : response.data.age,
        introduce : response.data.introduce
      })      
    }).catch(err => {
        console.log(err);
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const data = {
      email : userEmail,
      nickname : e.target.nickname.value,
      profile : userData.profile,
      age : userData.age,
      introduce : e.target.introduce.value
    }

    const formData = new FormData();
    formData.append("data", new Blob([JSON.stringify(data)], {type: "application/json"}));
    formData.append("profile", e.target.profile.files[0]);

    await axios.patch(`http://localhost:8080/api/myinformation/update/${userEmail}`, formData,
    {
      headers:{
        "Content-Type" : "multipart/form-data",
        Authorization : `Bearer ${localStorage.getItem('token')}`
      }
    }
    ).then((response) => {
      if(response.status === 200){
        console.log(response);
        alert("????????? ????????? ?????????????????????.");
        navigate('/home/myinformation', { replace: true });
      }
      else{
        alert("????????? ????????? ??????????????????.");
      }
    }).catch((error) => {
      console.log(error);
    });

  }

  const ageChange = (e) => {
    setUserData({...userData, age:e.target.value});
  }

  React.useEffect(() => {
    getInformation();
  }, [])

  

  return (
    <Page title="??? ?????? ?????? | ????????? ??????">
    <Container>
      <Typography variant="h4" gutterBottom>
          ??? ?????? ??????
      </Typography>
      {userData && 
      <Card sx={{paddingBottom:5, marginBottom:5}}>
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2} justifyContent="center">
          
          <Grid item xs={12} md={12}>
          <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" sx={{marginTop:2, marginBottom:2}}>
            {imageSrc ? <Avatar alt="Profile Image" src={imageSrc} sx={{width:56, height:56}} />
             : <Avatar alt="Profile Image" src={userData.profile} sx={{width:56, height:56}} />}
            <Stack spacing={0}>
              <Typography>{userEmail}</Typography>
              <label htmlFor="profile">
                <Input accept="image/*" name="profile" id="profile" type="file" sx={{display:"none"}} onChange={(e) => {
                  encodeFileToBase64(e.target.files[0])
                }}/>
                <Button size="small" component="span">
                  ????????? ?????? ??????
                </Button>
              </label>
            </Stack>
          </Stack>
          </Grid>
          
          <Grid item xs={12} md={12} justifyContent="center" alignItems="center" display="flex" sx={{marginTop : 2}}>
            <TextField defaultValue={userData.nickname} name="nickname" id="nickname" label="?????????" variant="outlined" sx={{width:500}}/>          
          </Grid>
          
          <Grid item xs={12} md={12} justifyContent="center" alignItems="center" display="flex" sx={{marginTop : 2}}>
          <FormControl sx={{width:500}} >
            <InputLabel id="age_label">Age</InputLabel>
            <Select
              labelId="age_label"
              id="age"
              label="?????????"
              value={userData.age}
              onChange={ageChange}
            >
              <MenuItem value={10}>10???</MenuItem>
              <MenuItem value={20}>20???</MenuItem>
              <MenuItem value={30}>30???</MenuItem>
              <MenuItem value={40}>40???</MenuItem>
              <MenuItem value={50}>50???</MenuItem>
              <MenuItem value={60}>60???</MenuItem>
              <MenuItem value={70}>70???</MenuItem>
              <MenuItem value={80}>80??? ??????</MenuItem>
            </Select>
          </FormControl>
          </Grid>
          
          <Grid item xs={12} md={12} justifyContent="center" alignItems="center" display="flex" sx={{marginTop : 2}}>
            <TextField multiline minRows={3} defaultValue={userData.introduce} name="introduce" id="introduce" label="?????? ??????" variant="outlined" sx={{width:500}}/>          
          </Grid>

          <Grid item xs={12} md={12} justifyContent="center" alignItems="center" display="flex" sx={{marginTop : 2}}>
            <Button type="submit" variant="contained" sx={{width:500}}>????????????</Button>
          </Grid>
          
          </Grid>
        </form>
      </Card>
    }
      
      
      
    </Container>
  </Page>
  )
}
