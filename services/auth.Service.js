import axios from "axios";
import { setUserSession, removerUserSession, getUser } from "../Utils/Common";

const API_URL = "https://cashout-app.onrender.com/api/v1/auth/";

// Register Auth
const signUp = (
  firstName,
  lastName,
  phoneNumber,
  username,
  email,
  password
) => {
  return axios.post(API_URL + "register", {
    firstName,
    lastName,
    phoneNumber,
    username,
    email,
    password,
  }).then((response) => {
    if (response?.data.token) {
    setUserSession(response.data.token, JSON.stringify(response.data.user));
    console.log(response);
  }
})
};

// Login Auth
const signIn = (email, password) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
        if (response?.data.token) {
        setUserSession(response.data.token, JSON.stringify(response.data.user));
        console.log(response);
      }
    })
};

// Logout Auth
const logout = () => {
  removerUserSession();
};

// Currently logged in user
const getCurrentUser = () => {
  getUser();
};

const AuthService = { signUp, signIn, logout, getCurrentUser };

export default AuthService;
