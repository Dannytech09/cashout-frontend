
export default function authHeader() {
    const user = JSON.parse(sessionStorage.getItem("user"))

    if(user && token) {
        return { Authorization: 'Bearer ' + token };
    } else {
        return {}
    }
    
}
