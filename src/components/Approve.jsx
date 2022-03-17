import React, { useContext, useRef, useState } from "react";
import { FaucetContext } from "../context/FaucetContext";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Main() {
  const { requestAccount, account, getTokenContract, provider } =
    useContext(FaucetContext);
  const notify = (msg) => toast.error(msg);
  const addressRef = useRef();
  const amountRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [hash, setHash] = useState("");
  const handleApprove = async () => {
    if (!ethers.utils.isAddress(addressRef.current.value)) {
      notify("Invalid address!");
      return;
    }
    if (amountRef.current.value <= 0) {
      notify("Invalid amount!");
      return;
    }
    if (
      ethers.utils.isAddress(addressRef.current.value) &&
      amountRef.current.value >= 1
    ) {
      setIsLoading(true);
      const contract = getTokenContract(provider.getSigner());
      const processedAmount = ethers.utils.parseUnits(
        amountRef.current.value,
        18
      );
      const res = await contract
        .approve(addressRef.current.value, processedAmount)
        .catch((err) => setIsLoading(false));
      const data = await res.wait();
      setHash(data.transactionHash);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <ToastContainer theme="dark" position="top-center" />{" "}
      <h2 className="text-black text-3xl font-medium font-montserrat">
        Approve Spender
      </h2>
      <div className="mt-5">
        <div>
          <div className="text-2xl my-1">Address</div>
          <div className="bg-input p-[2px] rounded overflow-hidden">
            <input
              ref={addressRef}
              placeholder="Spender address..."
              type="text"
              className="w-full rounded h-14 outline-none px-3 text-black text-2xl"
            />
          </div>
        </div>
        <div className="mt-2">
          <div className="text-2xl my-1">
            Amount (Not require to add 18 decimals)
          </div>
          <div className="bg-input p-[2px] rounded overflow-hidden">
            <input
              ref={amountRef}
              placeholder="Receive token address..."
              type="number"
              className="w-full rounded h-14 outline-none px-3 text-black text-2xl"
            />
          </div>
        </div>
        {account ? (
          <div onClick={() => handleApprove()} className="mt-8 mb-5">
            {!isLoading ? (
              <div className="bg-submit-button select-none mx-auto w-64 px-3 py-2 cursor-pointer bg-red-300 text-3xl my-1 text-center rounded font-montserrat font-bold text-white txt-button-shadow">
                Approve
              </div>
            ) : (
              <div className="mx-auto w-[50px] h-[50px] rounded-full border-t-2 border-blue-700 animate-spin"></div>
            )}
          </div>
        ) : (
          <div className="mt-8 mb-5">
            <div
              onClick={() => requestAccount()}
              className="bg-submit-button select-none mx-auto w-64 px-3 py-2 cursor-pointer bg-red-300 text-2xl my-1 text-center rounded font-montserrat font-bold text-white txt-button-shadow"
            >
              Connect Wallet
            </div>
          </div>
        )}
        {hash ? (
          <div className="select-none">
            Transaction hash:{" "}
            <a
              target="_blank"
              rel="noopennner noreferrer"
              className="break-words"
              href={"https://rinkeby.etherscan.io/tx/" + hash}
            >
              {hash}
            </a>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
