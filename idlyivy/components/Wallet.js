import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import {
    injected,
    walletconnect,
    resetWalletConnector,
} from "../conect/connectors";
import Link from "next/link";

export default function Wallet({ init, reload }) {
    const web3reactContext = useWeb3React();
    const chain = {
        1: "Ethereum",
        941: "PulseChain",
    };

    const [open, setOpen] = useState(false);
	const [showModal, setShowModal] = useState(false)

    const toggleOpen = () => {
        setOpen(!open);
    };

	const { active: networkActive, error: networkError, activate: activateNetwork, chainId } = useWeb3React()
    const [activatingConnector, setActivatingConnector] = React.useState();

	const [loaded, setLoaded] = useState(false)
	useEffect(() => {
		
		if (localStorage.getItem("Wallet") === "MetaMask") {


		injected
		.isAuthorized()
		.then((isAuthorized) => {
		  setLoaded(true)
		  console.log(isAuthorized)
		  if (isAuthorized && !networkActive && !networkError) {
				console.log('all three are good')
				activateNetwork(injected)
			}
			 
			console.log('hitting')
		  
		})
		.then(()=>{
			if (networkActive){
				init()}
			})
		.catch(() => {
		  setLoaded(true)
		})
	}
	else if (networkActive) {
		
		  
		init()
	}
	

	
    }, [activateNetwork, networkActive, networkError]);

    // useEffect(() => {
    //     if (localStorage.getItem("Wallet") === "MetaMask") {
    //         connectMetamaskSimple();
	// 		console.log('hitting')  
    //     } else if (localStorage.getItem("Wallet") === "WC") {
	// 		console.log('Wallet Connect stuff');
    //         connectWalletConnectSimple();
    //     }
    // }, []);

    const disconnectMetamaskSimple = () => {
		if (localStorage.getItem("Wallet") === "MetaMask") {
			setShowModal(true)
			localStorage.setItem("Wallet", "");
        } else if (localStorage.getItem("Wallet") === "WC") {
			web3reactContext.deactivate();
			localStorage.setItem("Wallet", "");
        }
		else{
			web3reactContext.deactivate();
			reload()
		}
        try {
        } catch (ex) {
            console.log(ex);
        }
    };

    const handleConnect = async () => {
        localStorage.setItem("loaded", false);

        connectWalletConnectSimple();
    };

    //web3react metamask
    const connectMetamaskSimple = async () => {
        try {
			console.log('connecting')
            web3reactContext.activate(injected);
			localStorage.setItem('Wallet', "MetaMask")

        } catch (ex) {
            console.log(ex);
        }
    };

    //web3react walletconnect
    const connectWalletConnectSimple = async () => {
        try {
			console.log('wall',walletconnect)
            resetWalletConnector(walletconnect);
            await web3reactContext.activate(walletconnect);
			localStorage.setItem('Wallet', "WC")

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
                                            className="w-3/4 h-fit  hover:text-white text-lg text-start  mt-1 p-4"
                                        >
                                            {" "}
                                            MetaMask
                                        </button>
                                        <img
                                            src="Meta.png"
                                            className="w-12 h-12 mr-3"
                                        ></img>
                                    </div>
                                    {/* <div className="flex justify-center">
                                        <hr className="w-full border-black "></hr>
                                    </div> */}
                                    <div className="flex justify-center items-center bg-white hover:bg-[#AD5FDD] ">
                                        <button
                                            onClick={handleConnect}
                                            className="w-3/4 h-fit  hover:text-white text-lg text-start p-4"
                                        >
                                            Wallet Connect
                                        </button>
                                        <img
                                            src="wallet.png"
                                            className="w-10 h-10 mr-3"
                                        ></img>
                                    </div>
                                 
                                    <button
                                        onClick={disconnectMetamaskSimple}
                                        className="w-full h-fit bg-white hover:bg-[#AD5FDD] text-lg hover:text-white text-start  p-4 "
                                    >
                                        Disconnect / Clear Cache
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <></>
                        )}
                    </>
                ) : (
                    <>
                        <div>
                            <button
                                type="button"
                                onClick={() => {
                                    toggleOpen();
                                }}
                                className="btn-nav w-full text-lg hover:border-2 dark:border-white border-black "
                            >
                                <h2 className="w-[120px]  overflow-hidden ">
                                    {web3reactContext.account.substring(0,4)}...{web3reactContext.account.slice(-4)}
                                </h2>
                                <div className="ml-6">
                                    {open ? (
                                        <img
                                            className="w-6 h-6"
                                            src="up.png"
                                        ></img>
                                    ) : (
                                        <img
                                            className="w-6 h-6"
                                            src="drop.png"
                                        ></img>
                                    )}
                                </div>
                            </button>
                        </div>
                        {open ? (
                            <div className=" relative md:absolute w-full rounded overflow-hidden shadow-lg  mt-1">
                              
                                    <Link href="https://etherscan.io/token/0xb5588C411ba0bb7D38865fdC51D082d004e519F7">
                                        <div className="w-full h-fit bg-white hover:bg-[#AD5FDD]  hover:text-white   p-4 ">
                                            <h2 className="text-[17px]">
                                                Token Address
                                            </h2>
                                        </div>
                                    </Link>
									<Link href="https://etherscan.io/address/0xb5588C411ba0bb7D38865fdC51D082d004e519F7">
                                        <div className="w-full h-fit bg-white hover:bg-[#AD5FDD]  hover:text-white   p-4 ">
                                            <h2 className="text-[17px]">
                                                Contract Address
                                            </h2>
                                        </div>
                                    </Link>

									
                         
                                    <button
                                        type="button"
                                        onClick={disconnectMetamaskSimple}
                                        className="w-full h-fit bg-white hover:bg-[#AD5FDD] text-lg hover:text-white text-start  p-4 "
                                    >
                                        Disconnect Wallet
                                    </button>
                              
                            </div>
                        ) : (
                            <></>
                        )}
                    </>
                )}
            </div>
			

				<div className="btn-nav w-[200px] bg-[#607BEE] hover:bg-[#607BEE] font-semibold">
					{chainId ? <div className="flex gap-[15px] items-center">
						
						<img src={`${chain[chainId]}.svg`}></img>
						<button onClick={()=>{console.log(web3reactContext)}}></button>
						<h2 className="text-lg">
							{chain[chainId]}
						</h2>
						</div> : 
						<>
						<h2>Not Connected</h2>


						</>
						}
				</div>
				<>
		{showModal?
	 <div className="relative z-30 " >
		<div className="fixed inset-0 bg-gray-500  bg-opacity-75 transition-opacity"></div>
			<div className="fixed z-10 inset-0 overflow-y-auto md:mt-32 md:ml-32">
				<div className="flex items-end md:items-center justify-center min-h-full p-4 text-center md:p-0">
					<div className="relative bg-white  rounded-lg text-left overflow-hidden shadow-xl transform transition-all md:my-8 md:max-w-5xl md:w-full">
						<div className="bg-gradient-to-b from-[#8226CA] to-[#1F6DC9] px-4 pt-5 pb-4 md:p-6 md:pb-4">
							<div className="md:flex md:items-start">
								<div className="flex justify-center">
									<img src="Spinn.gif" className="w-16 h-16"></img>
								</div>
					
							<div className="mt-3 text-center md:mt-0 md:ml-4 md:text-">
								<h3 className="text-3xl leading-6  text-gray-900 mt-6 font-semibold dark:text-white  w-full " >Disconnect MetaMask from your MetaMask Window!</h3>
								<div className="mt-4">
									<p className=" text-gray-500 dark:text-white pb-6">If you want to disconnect your wallet from our site, you need to do so manually by clicking on your MetaMask Extension and disconnecting from there
									</p>
		
								</div>
							</div>

							




							
						</div>
						<>
						
						<div className="flex justify-end">
							<button onClick={()=> {setShowModal(false)}} className="bg-[#252E3F] text-white h-10 w-20 rounded-2xl">Close</button>
						</div>
						
						</>
						
						
					</div>
				
				</div>
			</div>
		</div>
	</div>	
	:
		<></>
		}
       
	</>
			
        </div>
    );
}
