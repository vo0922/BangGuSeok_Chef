import {createContext, useState, useEffect} from 'react';
import axios from 'axios';

export const UserInfoContextStore = createContext();

const UserInfoContext = (props) => {
    const [account, setaccount] = useState({
        displayName:"",
        email:"",
        photoURL:"",
    });

    const UserInfo = {
        account,
        setaccount,
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            axios.get(`http://localhost:8080/api/${localStorage.getItem('authenticatedUser')}`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            })
            .then(response => {
                setaccount({
                    displayName: response.data.nickname,
                    email: response.data.email,
                    photoURL: response.data.profile
                })
            }).catch(err => {
            localStorage.clear();
            });
        }
    }, [])

    return(<UserInfoContextStore.Provider value={UserInfo}>{props.children}</UserInfoContextStore.Provider>)
}

  export default UserInfoContext;