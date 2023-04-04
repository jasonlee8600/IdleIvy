import Link from "next/link";
import { useWeb3React } from "@web3-react/core";
import { getContract } from "../conect/yaleContract";

function SideNav({ page, image, balance, rate, mintable, init, joinGame, user, payToEarn}) {
    
    const web3reactContext = useWeb3React();

    async function mint() {

        if(web3reactContext.account != undefined) {
            const YaleContract = getContract(
                web3reactContext.library,
                web3reactContext.account
            );
          
           
            if (mintable > 0) {
                try {
                    let mint = await YaleContract.mintCoin();
            
                    await mint.wait();
            
                    init();
                    }
                catch (error) {
                    console.log(error)
                }
            }
            else {
                console.log("Nothing to mint")
            }
            
        }
        else {
            console.log("Not connected")
        }
            
    }

    
    return (
        <div className="hidden md:flex flex-col items-center w-[250px] md:min-w-[250px] h-full bg-gradient-to-b from-[#272727] to-[#797979] gap-[35px] 2xl:h-screen gap-[60px]">
            <div className="mt-[25px]">
                <Link data-testid="return-home" href="/">
                        <h2 data-testid="IdleIvy" className="text-white font-semibold text-[60px]">
                            IdleIvy
                        </h2>
                </Link>
            </div>

            <div className="">
                <img className="mt=[20px]" src={image}></img>
            </div>

            <div className="">
                <div className="flex flex-col items-center mt-[20px]">
                    <h2 className={`text-3xl text-white`}>
                        Balance:
                    </h2>
                    <h3 className={`text-2xl text-white`}>{balance/10}</h3>
                </div>

                <div className="flex flex-col items-center mt-[25px]">
                    <h2 className={`text-3xl text-white`}>
                        Rate:
                    </h2>
                    <h3 className={`text-2xl text-white`}>{rate} tokens/min</h3>
                </div>
            </div>
            <div>
                {web3reactContext.account ?
                    <>
                    {user['resets'] > 0 ?
                    <>
                        <button type="button" className="bg-[#202B64] px-[35px] py-[10px] rounded-full outline outline-white outline-[7px]"
                            onClick={mint}> 
                            <div className="flex flex-col items-center">
                                <h2 className={`text-2xl text-white`}>
                                    Mint:
                                </h2>
                                <h3 className={`text-xl text-white`}>{mintable/10}</h3>
                            </div>
                        </button>

                        {/*<button type="button" className="bg-[#202B64] mt-[50px] px-[35px] py-[10px] rounded-full outline outline-white outline-[7px]"
                            onClick={payToEarn}> 
                            <div className="flex flex-col items-center">
                                <h2 className={`text-2xl text-white`}>
                                    Pay
                                </h2>
                            </div>
                </button>*/}
                    </>
                    :
                        <button type="button" className="bg-[#202B64] px-[35px] py-[10px] rounded-full outline outline-white outline-[7px]"
                            onClick={joinGame}> 
                            <div className="flex flex-col items-center">
                                <h2 className={`text-2xl text-white`}>
                                    Join Game!
                                </h2>
                            </div>
                        </button>
                    }
                    </>
                    :
                    <button type="button" className="bg-[#202B64] w-40 px-[35px] py-[10px] rounded-full outline outline-white outline-[7px]"> 
                        <div className="flex flex-col items-center">
                            <h2 className={`text-2xl text-white`}>
                                Connect Wallet!
                            </h2>
                        </div>
                    </button>
                }

            </div>

            <div className="mb-[25px]">
                <div className="flex flex-col items-center">
                    <h2 className="text-white font-semibold text-[30px]">
                        Leaderboard
                    </h2>
                </div>

                <div className="flex flex-col items-center mt-[20px]">
                    <Link href="/">
                        <h2 className="text-white font-semibold text-[30px]">
                            Home
                        </h2>
                    </Link>
                </div>
            </div>

        </div>

    );
}

export default SideNav;
