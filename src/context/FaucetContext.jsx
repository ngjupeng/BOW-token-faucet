import React, { createContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { tokenAbi, tokenContractAddress } from "../utils/constants";

export const FaucetContext = createContext();

export const FaucetContextProvider = ({ children }) => {
  const [account, setAccount] = useState();
  const [networkId, setNetworkId] = useState();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const requestAccount = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
  };
  const getTokenContract = (providerOrSigner) => {
    const tokenContract = new ethers.Contract(
      tokenContractAddress,
      tokenAbi,
      providerOrSigner
    );
    return tokenContract;
  };

  useEffect(async () => {
    const acc = await provider.listAccounts();
    if (acc) {
      setAccount(acc[0]);
    }
    setNetworkId(window.ethereum.networkVersion);
    window.ethereum.on("chainChanged", function (networkId) {
      // Time to reload your interface with the new networkId
      setNetworkId(networkId);
    });
    window.ethereum.on("accountsChanged", async function (acc) {
      if (acc) {
        // changed account
        setAccount(acc[0]);
      } else {
        // disconnect
        setAccount([]);
      }
    });
  }, []);
  return (
    <FaucetContext.Provider
      value={{
        requestAccount,
        account,
        provider,
        networkId,
        getTokenContract,
      }}
    >
      {children}
    </FaucetContext.Provider>
  );
};
