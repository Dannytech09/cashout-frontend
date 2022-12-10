import axios from "axios";
import React, { useState, useEffect } from "react";



export default function GetAllUsers() {
 const [users, setUsers] = useState([])

 const fetchUsers = () => {
    axios.get("https://cashout-app.herokuapp.com/api/v1/users", {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    }).then(res => {
      setUsers(res.data);
    }).catch(error => {
      if(error.response.data.status === 401 || error.response.data.status === 400){
        console.log(error)
      }
    })
    // console.log(response)
    
  };
  
  useEffect(() => {
    fetchUsers()
  }, [users]);

// let reqInstance = axios.create({
//   headers: {
//     Authorization : `Bearer ${sessionStorage.getItem("token")}`
//     }
// })

// reqInstance.get('https://cashout-app.herokuapp.com/api/v1/users').then(res => {
//   setUsers(res.data)
// }).catch(error => {
//   if(error.response.data.status === 401 || error.response.data.status === 400){
//     console.log(error)
//   }
// })

  return (
    <div className="grid grid-cols-2 md:grid-cols-6 gap-10 justify-center mt-10">
      {users &&
        users.map((user) => (
          <div key={user._id} className="border shadow-md p-6 flex flex-col justify-center">
            <h1 className="font-bold text-2xl">
              {user.firstName} {user.lastName}
            </h1>
            <p>{user.email}</p>
            <p>{user.username}</p>
            <p>{user.phoneNumber}</p>
          </div>
        ))}
    </div>

  )

}
