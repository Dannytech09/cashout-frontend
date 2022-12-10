import React, { useState, useEffect } from "react";
import { removeUserSession } from "../../Utils/Common";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from "../../styles/dashboard.module.css";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState();

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    setUser(user);
  }, []);

  const logoutHandler = () => {
    removeUserSession();
    router.push("/login");
  };

  return (
    <div className="text-slate-200">
      <Head>
        <title>Admin Dashboard</title>
      </Head>
      <h1 className="">Welcome to Dashboard Page</h1>
      <br />
      <br />
      <button onClick={logoutHandler} className={styles.logout} >Logout</button>
      <div className="grid grid-cols md:grid-cols-6 gap-10 justify-center mt-10">
        {user && (
          <div
            key={user._id}
            className="border shadow-md p-6 flex flex-col justify-center"
          >
            <h1 className="text-1xl text-slate-300 mb-2">
              First Name: {user.firstName} Last Name: {user.lastName}
            </h1>
            <p className="text-1xl text-slate-300 mb-2">Email: {user.email}</p>
            <p className="text-1xl text-slate-300 mb-2">Username: {user.username}</p>
            <p className="text-1xl text-slate-300 mb-2">Phone Number: {user.phoneNumber}</p>
          </div>
        )}
      </div>
    </div>
  );
}

