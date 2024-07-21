import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/all-posts");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full relative bg-gradient-to-r from-purple-600 to-blue-600 h-screen text-white overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://assets.lummi.ai/assets/QmSfA8Enb82GUCgdia4LF6L4uVnD4pgiMqxPZC3vTuDuhN?auto=format&w=1500"
          alt="Background Image"
          className="object-cover object-center w-full"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div
        className={`relative z-10 mx-auto -mt-10 w-full max-w-lg bg-white shadow-lg rounded-xl p-8 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
          Sign In to your account
        </h2>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email Address: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full mt-4 hover:bg-blue-600/90">
              Sign In
            </Button>
          </div>
        </form>
        <p className="text-sm font-normal text-center text-gray-500 mt-8">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-blue-600 hover:underline "
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
