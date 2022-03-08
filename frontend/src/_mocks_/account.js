import axios from "axios";

// ----------------------------------------------------------------------
const account = {
  displayName: "",
  email: "",
  photoURL: ""
};

axios.get(`http://localhost:8080/api/${localStorage.getItem('authenticatedUser')}`, {
  headers: {
    Authorization : `Bearer ${localStorage.getItem('token')}`
  }
})
.then(response => {
  account.displayName = response.data.nickname;
  account.email = response.data.email;
  account.photoURL = response.data.profile;
  console.log(account.displayName, account.email, account.photoURL)
})

export default account;
