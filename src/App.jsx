import Header from "./components/Header";
import Main from "./components/Main";
import Navigation from "./components/Navigation";
import { Routes, Route, Link } from "react-router-dom";
import Approve from "./components/Approve";
import { useContext, useEffect, useState } from "react";
import { FaucetContext } from "./context/FaucetContext";
function App() {
  const { networkId, isSupportMetaMask } = useContext(FaucetContext);
  const [statusNow, setStatusNow] = useState("free");
  useEffect(() => {
    const url = window.location.href;
    let param = url.substring(url.lastIndexOf("/") + 1);
    if (param == "approve") {
      setStatusNow(param);
    } else {
      setStatusNow("free");
    }
  }, []);
  return (
    <div className="min-w-screen min-h-screen bg-main h-auto pb-10 md:pb-0">
      {isSupportMetaMask ? (
        networkId != undefined ? (
          networkId == 4 ? (
            <div>
              {" "}
              <div>
                <Header />
                <Navigation />
              </div>
              <div>
                <div className="mt-3 md:mt-20 mx-5 md:mx-auto  md:max-w-[550px] h-auto bg-red-300 rounded px-5 py-3 bg-gray-100 shadow-2xl">
                  <div className="width-fit flex items-center justify-center my-3">
                    <div
                      onClick={() => setStatusNow("free")}
                      className={
                        "mx-4 cursor-pointer " +
                        (statusNow == "free" ? " font-bold" : "")
                      }
                    >
                      <Link to="/">Free Token</Link>
                    </div>
                    <div
                      onClick={() => setStatusNow("approve")}
                      className={
                        "cursor-pointer " +
                        (statusNow == "approve" ? " font-bold" : "")
                      }
                    >
                      <Link to="/approve">Approve</Link>
                    </div>
                  </div>
                  <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/approve" element={<Approve />} />
                    <Route path="*" element={<Main />} />
                  </Routes>
                </div>
              </div>
            </div>
          ) : (
            <div className="translate-y-1/2">
              <div className="text-center flex items-center justify-center shadow-xl w-[90%] md:max-w-[450px] h-[200px] bg-[#191b1fc2] mx-auto rounded-xl p-4 text-white text-xl">
                Sorry, our contract only run on rinkeby testnet, you have to
                switch your network to continue...
              </div>
            </div>
          )
        ) : (
          <div className="translate-y-1/2">
            <div className="text-center flex items-center justify-center shadow-xl w-[90%] md:max-w-[450px] h-[200px] bg-[#191b1fc2] mx-auto rounded-xl p-4 text-white text-xl">
              Try to refresh the page ^_^
            </div>
          </div>
        )
      ) : (
        <div className="translate-y-1/2">
          <div className="text-center flex items-center justify-center shadow-xl w-[90%] md:max-w-[450px] h-[200px] bg-[#191b1fc2] mx-auto rounded-xl p-4 text-white text-xl">
            You should consider MetaMask!
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
