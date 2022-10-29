import axios from "axios";

export const signup = (firstName, lastName, phoneNumber, email, username, password) => {
    return axios.post("https://cashout-app.herokuapp.com/api/v1/auth/register", {
        firstName, lastName, phoneNumber, email, username, password
    }).then((response) => {
        if(response.data.token) {
            localStorage.setItem("user", JSON.stringify(response.data))
        }
        return response.data
    })
}

const AuthService = {
    signup
};

export default AuthService;