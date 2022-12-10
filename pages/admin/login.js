import React, { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import AuthService from "../../services/auth.Service";
import UserService from "../../services/user.service";

export default function Login() {
  const {
    register,
    // setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const submitHandler = ({ email, password }) => {
    if (email && password) {
      AuthService.signIn(email, password)
        .then(() => {
          router.push("/admin/dashboard");
        })
        .catch((error) => {
          if (
            error.response?.status === 401 ||
            error.response?.status === 500
          ) {
            alert("Invalid Email and Password !");
            router.reload("/login");
          } else {
            alert("Something went Wrong");
          }
          console.log(error);
        });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="select-none text-xs sm:text-xl justify-center flex flex-col gap-4 sm:gap-6 items-center h-screen"
    >
      <h1 className="sm:text-3xl mb-2 text-white font-sans text-3xl">
        ADMIN LOGIN PAGE
      </h1>
      <p className="text-red-600">
        This Page is Restricted and only the Admin Have Access
      </p>
      {errors.email?.message && (
        <p className="text-center w-full max-w-[39ch] border border-solid border-rose-700 text-rose-300 py-2">
          {errors.email?.message}
        </p>
      )}

      <input
        type="text"
        {...register("email", {
          required: true,
          pattern: {
            value:
              /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "Invalid Email and password !",
          },
        })}
        className="duration-300 border-b-2 border-solid border-black focus:border-cyan-300 outline-none font-sans font-bold py-3 px-3 w-full max-w-[45ch] text-slate-900"
        placeholder="Please Enter Email Address"
        aria-invalid={errors.email ? "true" : "false"}
      />
      {errors.email?.type === "required" && (
        <p className="w-full max-w-[39ch] text-rose-300 mt-[-2ch]" role="alert">
          Please enter a valid email address !
        </p>
      )}

      <input
        type="text"
        {...register("password", {
          required: "Please enter a valid password !",
          minLength: {
            value: 6,
            message: "Minimum Length is 6",
          },
        })}
        className="duration-300 border-b-2 border-solid border-black focus:border-cyan-300 outline-none font-sans font-bold py-3 px-3 w-full max-w-[45ch] text-slate-900"
        placeholder="Please Enter Password"
        aria-invalid={errors.password ? "true" : "false"}
      />
      {errors.password && (
        <p className="w-full max-w-[39ch] text-red-300 mt-[-2ch]">
          {errors.password?.message}
        </p>
      )}

      <button
        type="submit"
        className="relative after:absolute after:top-0 after:right-full after:bg-white after:z-10 after:w-full after:h-full overflow-hidden hover:after:translate-x-full after:duration-300 hover:text-slate-900
     duration-300 w-full max-w-[39ch] border border-white border-solid uppercase py-2 px-2 text-white"
      >
        <h2 className="relative z-30"> Submit</h2>
      </button>
    </form>
  );
}
