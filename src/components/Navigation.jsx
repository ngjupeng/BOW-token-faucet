import React, { useContext } from "react";
import { FaucetContext } from "../context/FaucetContext";
import { shortenAddress } from "../utils/shortenAddress";

export default function Navigation() {
  const { requestAccount, account } = useContext(FaucetContext);
  return (
    <div>
      <div className="flex absolute right-5 top-5">
        <a
          rel="noopenner noreferrer"
          target="_blank"
          href="https://rinkeby.etherscan.io/token/0x85d1b81281AEF63122D97b556682Cf9934200b7F"
          className="hover:scale-125 transition duration-100 text-xl text-black font-medium select-none cursor-pointer "
        >
          Contract
        </a>
        {!account ? (
          <div
            onClick={() => requestAccount()}
            className="hover:scale-125 transition mx-8 text-xl text-black font-medium select-none cursor-pointer"
          >
            Connect Wallet
          </div>
        ) : (
          <a
            rel="noopenner noreferrer"
            target="_blank"
            href={"https://rinkeby.etherscan.io/address/" + account}
            className="hover:scale-125 transition mx-8 text-xl text-black font-medium select-none cursor-pointer"
          >
            {shortenAddress(account)}
          </a>
        )}
      </div>
    </div>
  );
}
