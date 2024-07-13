"use client";
// import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye } from "react-icons/fa";
// import Image from "next/image";
import { PiEyeClosedBold } from "react-icons/pi";

export default function Home() {
  const [login, setLogin] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    confirmPassword: "",
    otp: "",
    mobile: "",
  });

  const { register, handleSubmit } = useForm();


  const handleLogin = async () => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      if (data.success) {
        window.location.href = "/home";
      } else {
        alert("Invalid email or password. Please try again.");
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleSignup = async () => {
    if (formData.password !== formData.confirmPassword) {
      console.error("Passwords do not match");
      alert("Passwords do not match");
      return;
    }
    console.log(formData);
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          mobile: formData.mobile,
        }),
      }).then((res) => setLogin(true));
      const data = await response.json();
      if (data.success) {
        setVerifyOtp(true);
      } else {
        console.error("Signup failed", data.error);
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const resetform = () => {
    setFormData({
      email: "",
      password: "",
      username: "",
      confirmPassword: "",
      mobile: "",
    });
  };

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div
        className={` sm:items-center sm:justify-center sm:w-auto mx-auto sm:h-auto rounded-2xl border-[3px] border-violet-500 flex gap-[1rem] p-[1rem] `}
        style={{
          boxShadow: login
            ? "-6px 10px 0px 1px #8B5CF6"
            : "6px 10px 0px 1px #8B5CF6",
          transitionDuration: "300ms",
        }}
      >
        <form
          onSubmit={
            login
              ? handleSubmit(handleLogin) : handleSubmit(handleSignup)
          }
          className=" w-[26rem] sm:w-[80vw] rounded-2xl shadow-md h-[33rem]"
          style={{ right: login ? "8.5%" : "57%", transitionDuration: "300ms" }}
        >
          {login && (
            <div className="h-full">
              <div className="form flex flex-col justify-around h-full p-[2rem]">
                <h1 className="text-[1.5rem] font-[600]">Welcome Back</h1>
                <div className="w-full flex flex-col gap-[1rem]">
                  <input
                    {...register("email", { required: true })}
                    className="w-full rounded-lg  bg-gray-500 text-white outline-none p-[1rem]"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <div className="flex items-center gap-[1rem]">
                    <input
                      {...register("password", { required: true })}
                      className="rounded-lg w-[88%]  bg-gray-500 text-white outline-none p-[1rem]"
                      type={showPass ? "text" : "password"}
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="check"
                      className={`flex rounded-lg w-[12%] h-full items-center justify-center ${showPass ? "bg-blue-500" : " bg-gray-500"
                        }`}
                      style={{ transitionDuration: "300ms" }}
                    >
                      <input
                        onClick={() => setShowPass(!showPass)}
                        type="checkbox"
                        id="check"
                        hidden
                        checked={showPass}
                      />
                      {showPass ? <FaEye /> : <PiEyeClosedBold />}
                    </label>
                  </div>
                  <div className="flex justify-between">
                    <label
                      htmlFor="check"
                      className="flex items-center gap-[.5rem]"
                    >
                      <input type="checkbox" id="check" />
                      Remember me
                    </label>
                    <div
                      className="text-[#00f] hover:underline"
                      onClick={() => {
                        setForgotPassword(true);
                        resetform();
                      }}
                    >
                      Forgot Password
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-[1.2rem] rounded-lg p-[1rem] active:scale-95"
                >
                  Login
                </button>
                <div>
                  Don&apos;t have an account?{" "}
                  <span
                    className="text-[#00f] hover:underline cursor-pointer"
                    onClick={() => {
                      setLogin(false);
                      resetform();
                    }}
                  >
                    Register Now
                  </span>
                </div>
              </div>
            </div>
          )}
          {!login && (
            <div className="h-full">
              <div className="form flex flex-col justify-around h-full p-[2rem]">
                <h1 className="text-[1.5rem] font-[600]">
                  Welcome
                </h1>
                <div className="w-full flex flex-col gap-[1rem]">
                    <input
                      {...register("username", { required: true })}
                      className="w-full rounded-lg  bg-gray-500 text-white outline-none p-[1rem]"
                      type="text"
                      placeholder="Full Name"
                      value={formData.username}
                      onChange={handleChange}
                    />
                  <input
                    {...register("email", { required: true })}
                    className="w-full rounded-lg  bg-gray-500 text-white outline-none p-[1rem]"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <div className="flex items-center gap-[1rem]">
                    <input
                      {...register("password", { required: true })}
                      className="rounded-lg w-[88%]  bg-gray-500 text-white outline-none p-[1rem]"
                      type={showPass ? "text" : "password"}
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="check"
                      className={`flex rounded-lg w-[12%] h-full items-center justify-center cursor-pointer ${showPass ? "bg-blue-500" : " bg-gray-500"
                        }`}
                      style={{ transitionDuration: "300ms" }}
                    >
                      <input
                        onClick={() => setShowPass(!showPass)}
                        className="cursor-pointer"
                        type="checkbox"
                        id="check"
                        hidden
                        checked={showPass}
                      />
                      {showPass ? <FaEye /> : <PiEyeClosedBold />}
                    </label>
                  </div>
                  <input
                    {...register("confirmPassword", { required: true })}
                    className="rounded-lg  bg-gray-500 text-white outline-none p-[1rem]"
                    type={showPass ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-[1.2rem] rounded-lg p-[1rem] active:scale-95"
                >
                  Register
                </button>
                {/* <button
                    type="button"
                    className="border-[2px] border-black text-[1rem] rounded-lg p-[1rem] flex items-center gap-[.5rem] justify-center"
                  >
                    <FcGoogle size={30} /> Signup with Google
                  </button> */}
                <div className="text-center">
                  Already have an account?{" "}
                  <span
                    className="text-[#00f] hover:underline cursor-pointer"
                    onClick={() => {
                      setLogin(true);
                      resetform();
                    }}
                  >
                    Login Now
                  </span>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
