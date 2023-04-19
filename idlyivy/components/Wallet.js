import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../conect/connectors";

export default function Wallet({ init }) {
    //Consts for user wallet and chain info
    const web3reactContext = useWeb3React();
    const { active: networkActive, error: networkError, activate: activateNetwork, chainId } = useWeb3React()
    const chain = {
        942: "PulseChain"
    };

    //Toggling the connect button
    const [open, setOpen] = useState(false);
    const toggleOpen = () => {
        setOpen(!open);
    };

    //use effect to check user's connection status, and initialize if it changes
	useEffect(() => {
		
		if (localStorage.getItem("Wallet") === "MetaMask") {

            injected
            .isAuthorized()
            .then((isAuthorized) => {
            if (isAuthorized && !networkActive && !networkError) {
                    activateNetwork(injected)
                }
            })
            .then(()=>{
                if (networkActive){
                    init()}
                })
            .catch(() => {
            })
	    }
	    else if (networkActive) {
		    init()
	    }   
	
    }, [activateNetwork, networkActive, networkError]);

    //web3react metamask connection
    const connectMetamaskSimple = async () => {
        try {
			console.log('connecting')
            web3reactContext.activate(injected);
			localStorage.setItem('Wallet', "MetaMask")

        } catch (ex) {
            console.log(ex);
        }
    };

    
    return (
        <div className="flex flex-col md:flex-row justify-between gap-[20px]">
            <div className="relative inline-block text-left w-[200px] h-[40px]">
                {web3reactContext.account == undefined ? (
                    <>
                        <div>
                            <button
                                type="button"
                                onClick={() => {
                                    toggleOpen();
                                }}
                                className="btn-nav w-full text-xl hover:border-2 dark:border-white border-black"
                            >
                                Connect
                                <div className="ml-6">
                                    {open ? (
                                        <img
                                            className="w-6 h-6"
                                            src="up.png"
                                        ></img>
                                    ) : (
                                        <img
                                            className="w-6 h-6 mt-1"
                                            src="drop.png"
                                        ></img>
                                    )}
                                </div> 
                            </button>
                        </div>
                        {open ? (
                            <div className=" relative md:absolute w-full rounded-xl shadow-lg  mt-1 overflow-hidden">
                                <div className="rounded-full ">
                                    <div className="justify-center items-center bg-white hover:bg-[#AD5FDD] hidden sm:flex">
                                        <button
                                            onClick={connectMetamaskSimple}
                                            className="w-3/4 h-fit  hover:text-white text-lg text-start text-black mt-1 p-4"
                                        >
                                            {" "}
                                            MetaMask
                                        </button>
                                        <img
                                            src="Meta.png"
                                            className="w-12 h-12 mr-3"
                                        ></img>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <></>
                        )}
                    </>
                ) : (
                    <div>
                        <button type="button" className="btn-nav w-full text-lg hover:border-2 dark:border-white border-black ">
                            <h2 className="w-[120px]  overflow-hidden ">
                                {web3reactContext.account.substring(0,4)}...{web3reactContext.account.slice(-4)}
                            </h2>
                        </button>
                    </div>
                )}
            </div>
			
            <div className="btn-nav w-[200px] bg-[#607BEE] hover:bg-[#607BEE] font-semibold">
                {chainId ? 
                    <div className="flex gap-[15px] items-center">
                        <img src={`${chain[chainId]}.svg`}></img>
                        <h2 className="text-lg">
                            {chain[chainId]}
                        </h2>
                    </div> 
                    : 

                    <h2>Not Connected</h2>
                }
            </div>
			
        </div>
    );
}
