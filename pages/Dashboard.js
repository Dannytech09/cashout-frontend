import axios from "axios";
import React, { useState, useEffect } from "react";
import { getToken, removeUserSession } from "./Utils/Common";

export default function Dashboard() {
  const [user, setUser] = useState([]);

  const fetchUser = async () => {
    const response = await axios.get(
      "https://cashout-app.herokuapp.com/api/v1/auth/me",
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );

    console.log(response)
    setUser(response?.data.data);
  };
  //  setUser(response?.data?.data);
console.log(user)
  useEffect(() => {
    // console.log(sessionStorage.getItem("token"));
    fetchUser();
  }, [user]);

  const logoutHandler = () => {
    removeUserSession();
    window.location = "/login";
  };

  return (
    <div className="text-slate-200">
      <h1 className="">Welcome to Dashboard Page</h1>
      <br />
      <br />
      <button onClick={logoutHandler}>Logout</button>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-10 justify-center mt-10">
        {user && (
          <div
            key={user._id}
            className="border shadow-md p-6 flex flex-col justify-center"
          >
            <h1 className="font-bold text-2xl text-slate-300">
              {user.firstName} {user.lastName}
            </h1>
            <p>{user.email}</p>
            <p>{user.username}</p>
            <p>{user.phoneNumber}</p>
          </div>
        )}
      </div>
    </div>
  );
}
