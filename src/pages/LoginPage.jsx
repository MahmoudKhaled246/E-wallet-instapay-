import React, { useRef, useState } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

export default function LoginPage() {
  const navigate = useNavigate();

  // const [userName, setUserName] = useState("");
  // const [password, setPassword] = useState("");

  let userNameInput = useRef();
  let passwordInput = useRef();

  const dataUserName = "Mahmoud_Khaled";
  const dataPwd = "Admin@123";

  const handleLogin = () => {
    let userName = userNameInput.current.value;
    let password = passwordInput.current.value;

    if (userName == "" || password == "") {
      toast.error(`يرجى ملء الخانات`);
    } else {
      if (userName === dataUserName && password === dataPwd) {
        navigate("/balance");
      } else {
        toast.error(` اسم المستخدم او كلمة السر الذي ادخلتها غير صحيحة يرجى اعادة
              المحاولة`);
      }
    }
  };

  return (
    <main className="h-dvh w-full bg-linear-to-br from-[#7300DC] to-[#FF5B2B] flex justify-center items-center ">
      <Toaster position="top-center" reverseOrder={true} />

      <div className="login-card lg:w-120 md:w-120 w-90 rounded-xl bg-white/40 backdrop-blur-md flex flex-col items-center gap-20 py-10">
        <div className="logo">
          <img src={logo} width={150} alt="logo" />
        </div>
        <div className="login-body flex flex-col gap-4 justify-end items-end container px-15">
          <label htmlFor="userName">: اسم المستخدم</label>
          <input
            type="text"
            ref={userNameInput}
            placeholder="... ادخل اسم المستخدم"
            className="input input-primary bg-white/20 placeholder:text-right placeholder:text-white/80"
          />

          <label htmlFor="pwd">: كلمة المرور </label>
          <input
            type="password"
            ref={passwordInput}
            placeholder="... ادخل كلمة المرور"
            className="input input-primary bg-white/20 placeholder:text-right placeholder:text-white/80"
          />

          <button
            onClick={handleLogin}
            className="btn bg-[#7300DC] hover:bg-[#FF5B2B] duration-300 ease-in self-center mt-10"
          >
            تسجيل دخول
          </button>
        </div>
      </div>
    </main>
  );
}
