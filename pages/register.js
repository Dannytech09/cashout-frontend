import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import AuthService from "../services/auth.Service";

export default function SignUp() {
  // const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors }, // formState
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      username: "",
      email: "",
      password: "",
    },
    // mode: "onchange"
  });

  const router = useRouter();

  const submitHandler = ({ firstName, lastName, phoneNumber, username, email, password }) => {
    
    if(firstName || lastName || phoneNumber || username || email || password) {
     AuthService.signUp(firstName, lastName, phoneNumber, username, email, password).then(() => {
      router.push("/Dashboard")
     }).catch((error) => {
      if( error.response?.status === 400 || error.response?.status === 500 ) {
        alert("User Already Exist")
        console.log(error)
        // router.reload('/register')
      } else {
        alert("Something went wrong")
      }
     })
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="select-none text-xs sm:text-xl justify-center flex flex-col gap-4 sm:gap-6 items-center h-screen"
    >
      <h1 className="sm:text-3xl mb-2 text-white font-sans text-3xl">
        REGISTER
      </h1>
      {/* {successMessage && (
        <div className="text-center w-full max-w-[39ch] border border-solid border-green-400 text-green-900 py-2">
          {successMessage}
        </div>
      )}
      {error && (
        <div className="text-center w-full max-w-[39ch] border border-solid border-rose-700 text-rose-300 py-2">
          {error}
        </div>
      )} */}

      <input
        {...register("firstName", {
          required: "Please enter firstName !",
          minLength: {
            value: 3,
            message: "First Name can not be less than 3 letters"
          },
          maxLength: {
            value: 15,
            message: "First Name can not be greater than 15 letters"
          },
          pattern: {
            value: /^[A-Za-z]+$/,
            message: "Only letters are allowed / No spacing !"
          },
        })}
        className="duration-300 border-b-2 border-solid border-black focus:border-cyan-300 outline-none font-sans font-bold py-3 px-3 w-full max-w-[45ch] text-slate-900"
        placeholder="Please Enter Your First Name"
        aria-invalid={errors.firstName ? "true" : "false"}
      />
        {errors.firstName && (
          <p className="w-full max-w-[39ch] text-rose-300 mt-[-2ch]" role="alert">
            {errors.firstName?.message}
          </p>
        )}

      <input
        {...register("lastName", {
          required: "Please enter lastName !",
          minLength: {
            value: 3,
            message: "Last Name can not be less than 3 letters",
          },
          maxLength: {
            value: 15,
            message: "Last Name can not be greater than 15 letters"
          },
          pattern: {
            value: /^[A-Za-z]+$/,
            message: "Only letters are allowed / No spacing !"
          },
        })}
        className="duration-300 border-b-2 border-solid border-black focus:border-cyan-300 outline-none font-sans font-bold py-3 px-3 w-full max-w-[45ch] text-slate-900"
        placeholder="Please Enter Your Last Name"
        aria-invalid={errors.lastName ? "true" : "false"}
      />
        {errors.lastName && (
          <p className="w-full max-w-[39ch] text-rose-300 mt-[-2ch]" role="alert">
          {errors.lastName?.message}
          </p>
        )}

      <input
        {...register("phoneNumber", {
          required: " Please enter phoneNumber !",
          minLength: {
            value: 11,
            message: "Phone number can not be less than 11 digits"
          },
          maxLength: {
            value: 11,
            message: "Phone number can not be greater than 11 digits",
          },
          pattern: {
            value:  /^[0-9\b]+$/,
            message: "Input valid phone number !"
          }
        })}
        className="duration-300 border-b-2 border-solid border-black focus:border-cyan-300 outline-none font-sans font-bold py-3 px-3 w-full max-w-[45ch] text-slate-900"
        placeholder="Please Enter PhoneNumber"
        aria-invalid={errors.phoneNumber ? "true" : "false"}
      />
          {errors.phoneNumber && (
        <p className="w-full max-w-[39ch] text-rose-300 mt-[-2ch]" role="alert">
         {errors.phoneNumber?.message}
        </p>
      )}

      <input
        {...register("username", {
          required: "  Please enter username !",
          minLength: {
            value: 3,
            message: "username can not be less than 3 digits",
          },
          maxLength: {
            value: 10,
            message: "username can not be greater than 10 digits"
          }
        })}
        className="duration-300 border-b-2 border-solid border-black focus:border-cyan-300 outline-none font-sans font-bold py-3 px-3 w-full max-w-[45ch] text-slate-900"
        placeholder="Please Enter Username"
        aria-invalid={errors.username ? "true" : "false"}
      />
          {errors.username && (
        <p className="w-full max-w-[39ch] text-rose-300 mt-[-2ch]" role="alert">
          {errors.username?.message}
        </p>
      )}

      <input
        {...register("email", {
          required: " Please enter email !",
          pattern: {
            value:
              /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "Invalid Email!",
          },
          maxLength: {
            value: 50,
            message: "Email can not be more than 50 characters"
          }
        })}
        className="duration-300 border-b-2 border-solid border-black focus:border-cyan-300 outline-none font-sans font-bold py-3 px-3 w-full max-w-[45ch] text-slate-900"
        placeholder="Please Enter a Valid Email Address"
        // aria-invalid={errors.email ? "true" : "false"}
      />
          {errors.email && (
        <p className="w-full max-w-[39ch] text-rose-300 mt-[-2ch]" role="alert">
         {errors.email?.message}
        </p>
      )}

      <input
        {...register("password", {
          required: "Please enter password !",
          minLength: {
            value: 6,
            message: "Minimum of 6 digits"
          }
      }
        )}
        autoComplete="off"
        className="duration-300 border-b-2 border-solid border-black focus:border-cyan-300 outline-none font-sans font-bold py-3 px-3 w-full max-w-[45ch] text-slate-900"
        placeholder="Please Enter Password"
        aria-invalid={errors.password ? "true" : "false"}
      />
          {errors.password && (
        <p className="w-full max-w-[39ch] text-rose-300 mt-[-2ch]" role="alert">
          {errors.password?.message}
        </p>
      )}

      <button
        // disabled={!formState.isValid}
        className="relative after:absolute after:top-0 after:right-full after:bg-white after:z-10 after:w-full after:h-full overflow-hidden hover:after:translate-x-full after:duration-300 hover:text-slate-900
      duration-300 w-full max-w-[39ch] border border-white border-solid uppercase py-2 px-2 text-white"
      >
        <h2 className="relative z-30"> Sign Up</h2>
      </button>

      <div className="flex mt-1 gap-4 text-center justify-center select-none">
        <div className="py-1 px-1 font-sans bg-hover:red font-bold text-1xl text-slate-200 bg-cyan-700">
          <Link href="/login">Already Have an Account ?</Link>
        </div>
        <div className="py-1 px-1 font-sans bg-hover:red font-bold text-1xl text-slate-200 bg-cyan-700">
          <Link href="/">Navigate to Home ?</Link>
        </div>
      </div>
    </form>
  );
}
