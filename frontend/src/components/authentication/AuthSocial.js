import { useEffect } from 'react';
import { Icon } from '@iconify/react';
import googleFill from '@iconify/icons-eva/google-fill';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
// material
import { Stack, Button, Divider, Typography} from '@mui/material';

// ----------------------------------------------------------------------
const { naver } = window;
export default function AuthSocial() {
  // function NaverLogin() {
  //   const naverLogin = new naver.LoginWithNaverId({
  //     clientId: "u11iH03SnTr8EtnWbasP",
  //     callbackUrl: "http://localhost:3000/logincallback",
  //     isPopup: false,
  //     loginButton: {type: 1, height:40} ,
  //     callbackHandle: true
  //   });
  //   naverLogin.init();
  // }

  // useEffect(() => {
  //   NaverLogin();
  // });

  return (
    <>
      <Stack direction="row" spacing={2}>              
        <Button fullWidth href="http://localhost:8080/oauth2/authorization/naver" size="large" color="inherit" variant="outlined">
          <img src="/img/naver_white.png" height="40" alt="naver_login"/>
        </Button>

        <Button fullWidth href="http://localhost:8080/oauth2/authorization/google" size="large" color="inherit" variant="outlined">
          <Icon icon={googleFill} color="#DF3E30" height={24} />
        </Button>
      </Stack>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          OR
        </Typography>
      </Divider>
    </>
  );
}
