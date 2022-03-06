import axios from "axios";

// ----------------------------------------------------------------------

axios.get('http://localhost:8080/api/my', {
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

const account = {
  displayName: "",
  email: "",
  photoURL: ""
};

export default account;
