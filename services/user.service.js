import axios from "axios";
import authHeader from "./auth-Header";

const API_URL = "https://cashout-app.onrender.com/api/v1/"

// Get User's Details
const getLoggedInUser = () => {
    return axios.get(API_URL + 'auth/me', { headers: authHeader()})
};

// Get All users
const getAllUsers = () => {
    return axios.get(API_URL + 'users', { headers: authHeader()})
}

const UserService = {
    getLoggedInUser, getAllUsers,
};

export default UserService;