import React, { useRef, useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import dayjs from "dayjs";

export default function BalancePage() {
  const amountInput = useRef();

  let originalTransactionsJson = localStorage.getItem("Transactions");

  let originalTransactions = JSON.parse(originalTransactionsJson) || [];
  const [transactions, setTransactions] = useState(originalTransactions || []);

  const [balance, setBalance] = useState(
    originalTransactions.length
      ? originalTransactions[originalTransactions.length - 1].after
      : 0,
  );
  const decreaseBalance = () => {
    let amount = +amountInput.current.value;

    if (amount == 0) {
      toast.error("من فضلك ادخل قيمة");
    } else if (amount > balance) {
      toast.error("رصيدك غير كافي");
    } else {
      let newTransaction = {
        before: balance,
        amount: amount,
        type: "سحب",
        after: balance - amount,
        dateTime: dayjs().format("DD/MM/YYYY hh:mm A"),
      };
      let copy = [...transactions];
      copy.push(newTransaction);
      let tranJson = JSON.stringify(copy);
      localStorage.setItem("Transactions", tranJson);
      setTransactions(copy);
      setBalance(balance - amount);

      amountInput.current.value = "";
      toast.success(`تم سحب ${amount} ج.م من حسابك بنجاح`);
    }
  };

  const increaseBalance = () => {
    let amount = +amountInput.current.value;
    if (amount == 0) {
      toast.error("من فضلك ادخل قيمة");
    } else {
      let newTransaction = {
        before: balance,
        amount: amount,
        type: "إيداع",
        after: balance + amount,
        dateTime: dayjs().format("DD/MM/YYYY hh:mm A"),
      };
      let copy = [...transactions];
      copy.push(newTransaction);
      let tranJson = JSON.stringify(copy);
      localStorage.setItem("Transactions", tranJson);
      setTransactions(copy);
      setBalance(amount + balance);
      amountInput.current.value = "";
      toast.success(`تمت إضافة ${amount} ج.م لحسابك بنجاح`);
    }
  };

  const cancelLastTransaction = () => {
    let copy = [...transactions];
    let lastBalance = copy[copy.length - 1].before;
    copy.splice(copy.length - 1, 1);
    let tranJson = JSON.stringify(copy);
    localStorage.setItem("Transactions", tranJson);
    setTransactions(copy);
    setBalance(lastBalance);
    toast.success("تم الغاء اخر عملية بنجاح");
  };

  return (
    <main className="h-dvh w-full bg-linear-to-br from-[#7300DC] to-[#FF5B2B] flex justify-center items-center">
      <Toaster position="top-center" reverseOrder={true} />
      <div
        className="contianer grid grid-rows-2  grid-cols-3 gap-4  h-[90%] w-[90%] rounded-2xl "
        dir="rtl"
      >
        {/* Top left div */}
        <div className="action col-start-3 row-start-1   flex flex-col   bg-white/40 backdrop-blur-md rounded-2xl justify-evenly  items-center py-20">
          <input
            type="number"
            ref={amountInput}
            dir="ltr"
            placeholder="ادخل القيمة ... "
            className="input input-neutral rounded-2xl flex justify-center input-xl  text-center bg-white/20 w-[90%] placeholder:text-white/80 placeholder:text-center "
          />

          <div className="action-btns gap-4 grid grid-cols-2 w-[90%] ] ">
            <button
              className="btn btn-warning py-10 text-2xl rounded-2xl"
              onClick={decreaseBalance}
            >
              سحب -
            </button>
            <button
              className="btn btn-success py-10 text-2xl rounded-2xl"
              onClick={increaseBalance}
            >
              إيداع +
            </button>
          </div>
        </div>
        {/* bottom left div */}

        <div className="data col-start-3 row-start-2 bg-white/40 backdrop-blur-md rounded-2xl flex flex-col justify-between items-center  p-20 text-center">
          <h1 className="text-[25px]">مرحباً : Mahmoud Khaled ❤️</h1>
          <p className="text-[49px]">الرصيد : {balance} ج.م</p>
          <Link to={"/"} className="btn btn-error text-white">
            تسجل خروج
          </Link>
        </div>
        {/* right div */}

        <div className="action col-start-1 row-start-1 col-span-2 row-span-2  bg-white/40 backdrop-blur-md rounded-2xl  p-2 ">
          <div className="overflow-x-auto h-full">
            <table
              className={`table border-collapse border border-white/20 ${transactions.length == 0 && "h-full "}`}
            >
              {/* head */}
              <thead>
                <tr>
                  <th className="text-center border border-base-content/20">
                    #
                  </th>
                  <th className="text-center border border-base-content/20">
                    الرصيد السابق
                  </th>
                  <th className="text-center border border-base-content/20">
                    القيمة
                  </th>
                  <th className="text-center border border-base-content/20">
                    نوع العملية
                  </th>
                  <th className="text-center border border-base-content/20">
                    الرصيد المتبقي
                  </th>
                  <th className="text-center border border-base-content/20">
                    تاريخ العملية
                  </th>
                  <th className="text-center border border-base-content/20">
                    تفيذ
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.length == 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center py-20 text-white/60 text-xl"
                    >
                      لا يوجد عمليات حالية
                    </td>
                  </tr>
                ) : (
                  transactions
                    .slice()
                    .reverse()
                    .map((el, index) => {
                      return (
                        <tr key={index}>
                          <td className="border border-base-content/20">
                            {index + 1}
                          </td>
                          <td className="border border-base-content/20">
                            {el.before} ج.م
                          </td>
                          <td className="border border-base-content/20">
                            {el.amount} ج.م
                          </td>
                          <td className="border border-base-content/20">
                            {el.type}
                          </td>
                          <td className="border border-base-content/20">
                            {el.after} ج.م
                          </td>
                          <td className="border-base-content/20" dir="ltr">
                            {el.dateTime}
                          </td>
                          <td className="border border-base-content/20 text-center">
                            {index == 0 && (
                              <button
                                onClick={cancelLastTransaction}
                                className="btn btn-error text-white"
                              >
                                إلغاء العملية
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
