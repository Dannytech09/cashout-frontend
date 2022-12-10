import Head from "next/head";
import SmileIcon from "../components/icons/SmileIcon";
import Layout from "../components/Layout";
import Greetings from "../components/utils/Greetings";
import styles from "../styles/dashboard.module.css";
import React, { useState, useEffect} from "react"

export default function Dashboard() {
  // const me = sessionStorage.getItem("user");
  // console.log(me.balance.$numberDecimal);

  const [user, setUser] = useState();

  useEffect(() => {
      const user = JSON.parse(sessionStorage.getItem("user"));
      setUser(user);
    }, []);


  return (
    <div className="text-slate-200 ">
      <Head>
        <title>My Dashboard</title>
      </Head>

      <Layout>
        <div className="w-full">
          <div className={styles.headerCon}>
            <div className="flex justify-center pt-3 text-center ">
              <h1 className="text-light text-lg"> <Greetings/> </h1>
              <span className="">
                <SmileIcon />
              </span>
            </div>
            <br />

              { user && (
            <div className="text-center">
                <h2 className={styles.welBack}>Welcome Back {user.firstName}!</h2>
              <p className="mt-2 p-4 text-sm">
                Refer people to CashOutPlug and earn 1,000 naira immediately the
                person upgrade his/her account to Partner's Account Type
              </p>
              <div className="flex w-full justify-center gap-5 mt-5">
                <div className="border ml-2 text-sm border-solid border-secondary p-2 rounded-2xl bg-secondary">
                  <button className={styles.fundWallet}>Fund Wallet</button>
                </div>
                <div className="border mr-2 text-sm border-solid border-secondary p-2 rounded-2xl bg-secondary">
                  <button className={styles.myTransact}>My Transactions</button>
                </div>
              </div>
            </div>
          )}
          </div>
        </div>
      </Layout>
    </div>
  );
}
