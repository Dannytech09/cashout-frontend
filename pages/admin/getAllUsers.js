import axios from "axios";
import React, { useState, useEffect } from "react";


export default function GetAllUsers() {
 const [users, setUsers] = useState([])

 const fetchUsers = async () => {
    const response = await axios("https://cashout-app.herokuapp.com/api/v1/users");
    setUsers(response?.data?.data);
  };

  useEffect(() => {
    fetchUsers();
  }, [users]);

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
