import axios from "axios"
import React, {useState} from "react";
import { setUserSession } from "../Utils/Common";
import Link from 'next/link';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const submitHandler = () => {
        if (!email || !password) {
            setError("Please enter email and password")
            return
        }
        setError(null)
        setLoading(true)
        axios.post("https://cashout-app.herokuapp.com/api/v1/auth/login", {
            email: email,
            password: password
        }).then(response => {
            console.log("response >>> ", response)
            setLoading(false)
            // if(response.data.token) {
            //   setUserSession("user", JSON.stringify(response.data.token))
            // }
            setUserSession(response.data.token)
           window.location = "/admin/Dashboard";
        }).catch(error => {
            if(error.response.data.status === 401 || error.response.data.status === 400){
                setError(error.response.data.message);
            }
            else {
                setError("Something went wrong!")
                window.location.reload();
            }
          
        })
       
    }

    const getEmail = (e) => {
        setEmail(e.target.value)
    }

    const getPassword = (e) => {
        setPassword(e.target.value)
    }

  return (

    <div className="select-none text-xs sm:text-xl justify-center flex flex-col gap-4 sm:gap-6 items-center h-screen">
      <h1 className="sm:text-3xl mb-2 text-white font-sans text-3xl">ADMIN LOGIN PAGE</h1>
      <p className="text-red-600">This Page is Restricted and only the Admin Have Access</p>
      {error && <div className="text-center w-full max-w-[39ch] border border-solid border-rose-700 text-rose-300 py-2">{error}</div>}
      <input 
        type="text"  value={email} onChange={getEmail}
        className="duration-300 border-b-2 border-solid border-black focus:border-cyan-300 outline-none font-sans font-bold py-3 px-3 w-full max-w-[45ch] text-slate-900"
        placeholder="Please Enter Email Address"
      />
      <input value={password} onChange={getPassword}
        type="text"
        className="duration-300 border-b-2 border-solid border-black focus:border-cyan-300 outline-none font-sans font-bold py-3 px-3 w-full max-w-[45ch] text-slate-900"
        placeholder="Please Enter Password"
      />
      <button 
      value={loading ? "Loading..." : "Login" }
      disabled={loading}
      onClick={submitHandler} className="relative after:absolute after:top-0 after:right-full after:bg-white after:z-10 after:w-full after:h-full overflow-hidden hover:after:translate-x-full after:duration-300 hover:text-slate-900
      duration-300 w-full max-w-[39ch] border border-white border-solid uppercase py-2 px-2 text-white">
        <h2 className="relative z-30"> Submit</h2>
      </button>  
    </div>
  );
}
