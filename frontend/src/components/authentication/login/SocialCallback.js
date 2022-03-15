import {React, useEffect} from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function Teeessst() {
    const open = true;
    const params = new URLSearchParams(window.location.search);
    console.log(params)

    useEffect(() => {
        localStorage.setItem('token', params.get("accesstoken"));
        localStorage.setItem('authenticatedUser', params.get("email"));
        console.log(localStorage.getItem('token'))
        window.location.replace('/')
    }, [])
    return (
        <div>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
}

export default Teeessst;