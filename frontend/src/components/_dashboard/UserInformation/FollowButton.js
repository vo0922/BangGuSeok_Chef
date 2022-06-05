import React from 'react'
import axios from 'axios';
import { Button } from '@mui/material'

export default function FollowButton(followedUser) {
    const followData = {
      followedEmail : followedUser.followedUser,
      followingEmail : localStorage.getItem("authenticatedUser")
    }
    const [followBtn, setFollowBtn] = React.useState()
    

  async function followOnClick(){
    if(followData.followedEmail === followData.followingEmail){
      alert("자기 자신은 팔로우 할 수 없습니다.");
      return;
    }
    await axios.post(`http://localhost:8080/api/follow`, followData, {
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
    if(followData.followedEmail === followData.followingEmail){
      setFollowBtn(<Button variant="filled" disabled>팔로우</Button>)
      return;
    }
    await axios.post(`http://localhost:8080/api/follow/check`, followData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => {
        if(!response.data){
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
