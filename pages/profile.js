import Head from "next/head";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";

export default function profile() {
  const [user, setUser] = useState();

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    setUser(user);
  }, []);

  return (
    <div className="text-slate-200 h-screen">
      <Head>
        <title>My Profile</title>
      </Head>
      {/* <Layout> */}
        <div className="p-3">
          <h1 className="text-center">My Profile</h1>
          <br />
          {user && (
            <div className="flex justify-around">
              <p className="">
                Dear {user.firstName}, Your Account Privacy is important to us,
                please note that we will never ask for your password. So, please keep it safe...
              </p>
            </div>
          )}
          <div className="flex gap-10 justify-center mt-5">
            {user && (
              <div
                key={user._id}
                className="border p-6 flex flex-col justify-center"
              >
                <div>
                  <h1 className="text-1xl text-slate-300 mb-2">First Name</h1>
                  <input type="text" readOnly value={user.firstName}></input>
                </div>
                <div>
                  <h1 className="text-1xl text-slate-300 mb-2">Last Name</h1>
                  <input type="text" readOnly value={user.lastName}></input>
                </div>
                <div>
                  <h1 className="text-1xl text-slate-300 mb-2">Email</h1>
                  <input type="text" readOnly value={user.email}></input>
                </div>
                <div>
                  <h1 className="text-1xl text-slate-300 mb-2">Username</h1>
                  <input type="text" readOnly value={user.username}></input>
                </div>
                <div>
                  <h1 className="text-1xl text-slate-300 mb-2">Phone Number</h1>
                  <input type="text" readOnly value={user.phoneNumber}></input>
                </div>
              </div>
            )}
          </div>
          <Link href={"/dashboard"}>Dashboard</Link>
        </div>
      {/* </Layout> */}
    </div>
  );
}
