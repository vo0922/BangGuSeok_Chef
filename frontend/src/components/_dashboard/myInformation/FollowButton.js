import React from 'react'
import axios from 'axios';
import { Button } from '@mui/material'

const dummyData = {
    followedEmail : "kjm0551@naver.com",
    followingEmail : "kjmin0551@gmail.com"
}

export default function FollowButton() {
    const [followBtn, setFollowBtn] = React.useState()
    

  async function followOnClick(){
    await axios.post(`http://localhost:8080/api/follow`, dummyData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => {
        if(!response.data.followCheck){
            setFollowBtn(<Button onClick={() => followOnClick()}>팔로우</Button>)    
        }
        else{
            setFollowBtn(<Button onClick={() => followOnClick()}>팔로우 취소</Button>)
        }
      }).catch(err => {
          console.log(err);
      });
  }

  async function followCheck(){
    await axios.post(`http://localhost:8080/api/follow/check`, dummyData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => {
        console.log(response);
        if(response.data){
            setFollowBtn(<Button onClick={() => followOnClick()}>팔로우</Button>)    
        }
        else if(response.data === ""){
          setFollowBtn(<Button onClick={() => followOnClick()}>팔로우</Button>)   
        }
        else{
          setFollowBtn(<Button onClick={() => followOnClick()}>팔로우 취소</Button>)
        }
        
      }).catch(err => {
          console.log(err);
      });
  }

  React.useEffect(() => {
    followCheck();
  }, [])
  return (
    <div>
        {followBtn}
    </div>
  )
}
