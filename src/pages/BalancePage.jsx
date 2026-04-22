import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

export default function BalancePage() {
  const [balance, setBalance] = useState(2000);
  const [amount, setAmount] = useState("");

  const [isEmpty, setIsEmpty] = useState(false);
  const [isUnderZero, setIsUnderZero] = useState(false);

  const decreaseBalance = () => {
    if (amount === "") {
      setIsEmpty(true);
    } else if (amount > balance) {
      setIsUnderZero(true);
    } else {
      setIsUnderZero(false);
      setIsEmpty(false);
      setBalance(balance - +amount);
      setAmount("");
    }
  };

  const increaseBalance = () => {
    if (amount === "") {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
      setBalance(balance + +amount);
      setAmount("");
    }
  };

  return (
    <main
      className="h-dvh w-full bg-linear-to-br from-[#7300DC] to-[#FF5B2B] flex justify-center items-center"
      dir="rtl"
    >
      <div className="contianer grid grid-cols-3 gap-4  h-[90%] w-[90%] rounded-2xl">
        <div className="data  bg-white/40 backdrop-blur-md rounded-2xl flex flex-col justify-center items-center gap-20 p-20 text-center">
          <img src={logo} alt="" />
          <h1 className="text-[25px]">مرحباً : Mahmoud Khaled ❤️</h1>
          <p className="text-[49px]">الرصيد : {balance} ج.م</p>
          <Link to={"/"} className="btn btn-error text-white">
            تسجل خروج
          </Link>
        </div>
        <div className="action col-span-2 flex flex-col gap-20  bg-white/40 backdrop-blur-md rounded-2xl justify-center items-center py-20">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={isEmpty ? "من فضلك ادخل قيمة" : "ادخل القيمة ... "}
            className={
              isEmpty
                ? "input input-error rounded-2xl flex justify-center input-xl text-6xl text-center bg-white/20 w-[90%] placeholder:text-red-500/80 h-[50%] placeholder:text-center placeholder:text-4xl placeholder:align-middle"
                : "input input-neutral rounded-2xl flex justify-center input-xl text-6xl text-center bg-white/20 w-[90%] placeholder:text-white/80 h-[50%] placeholder:text-center placeholder:text-4xl placeholder:align-middle"
            }
          />
          {isUnderZero && (
            <p className="text-red-600 text-2xl mt-[-30px]">
              القيمة التي ادخلتها اكبر من مجموع رصيدك الرجاء التأكد من الرصيد
              المتبقي
            </p>
          )}

          <div className="action-btns  gap-4 grid grid-cols-2 w-[90%] h-[50%] ">
            <button
              className="btn btn-warning py-40 text-4xl rounded-2xl"
              onClick={decreaseBalance}
            >
              سحب -
            </button>
            <button
              className="btn btn-success py-40 text-4xl rounded-2xl"
              onClick={increaseBalance}
            >
              إيداع +
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
