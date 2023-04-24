import Link from "next/link";
import { useWeb3React } from "@web3-react/core";
import { getContract } from "../conect/yaleContract";


function SideNav({ image, balance, rate, mintable, init, joinGame, user, setPending}) {
    
    //Wallet and Blockchain info about user
    const web3reactContext = useWeb3React();

    //function to mint the coins for a user
    async function mint() {

        //Check if the user is connected
        if(web3reactContext.account != undefined) {
            
            //Instance of smart contract
            const YaleContract = getContract(
                web3reactContext.library,
                web3reactContext.account
            );
          
            //Check if user has tokens to mint
            if (mintable > 0) {
                try {
                    setPending(true)
                    //mint function call to contract
                    let mint = await YaleContract.mintCoin();
            
                    //wait for transaction to complete
                    await mint.wait();
            
                    init();
                    setPending(false)
                    }
                catch (error) {
                    //log if some error
                    console.log(error)
                    setPending(false)
                }
            }
            //User doesn't have tokens to mint
            else {
                console.log("Nothing to mint")
            }
            
        }
        //User isn't connected to the site
        else {
            console.log("Not connected")
        }
            
    }

    
    return (
        <div className="hidden md:flex flex-col items-center w-[250px] min-w-[250px] h-full bg-gradient-to-b from-[#272727] to-[#797979] gap-[30px] 2xl:gap-[60px] h-screen">
            <div className="mt-[30px]">
                <Link data-testid="return-home" href="/">
                        <h2 data-testid="IdleIvy" className="text-white font-semibold text-[60px]">
                            IdleIvy
                        </h2>
                </Link>
            </div>

            <div className="">
                <img className="mt=[0px]" src={image}></img>
            </div>

            <div className="">
                <div className="flex flex-col items-center mt-[0px]">
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
                        {/*load if user connected and joined game*/}
                        <button type="button" className="bg-[#202B64] px-[35px] py-[10px] rounded-full outline outline-white outline-[7px] my-[10px]"
                            onClick={mint}> 
                            <div className="flex flex-col items-center">
                                <h2 className={`text-2xl text-white`}>
                                    Mint:
                                </h2>
                                <h3 className={`text-xl text-white`}>{mintable/10}</h3>
                            </div>
                        </button>

                    </>
                    :
                      <> 
                        {/* Load if user connected but hasn't joined game*/}
                        <button type="button" className="bg-[#202B64] px-[35px] py-[10px] rounded-full outline outline-white outline-[7px]"
                            onClick={joinGame}> 
                            <div className="flex flex-col items-center">
                                <h2 className={`text-2xl text-white`}>
                                    Join Game!
                                </h2>
                            </div>
                        </button>
                      </>
                    }
                    </>
                    :
                    <>
                        {/* Load if not connected */}
                        <button type="button" className="bg-[#202B64] w-40 px-[35px] py-[10px] rounded-full outline outline-white outline-[7px]"> 
                            <div className="flex flex-col items-center">
                                <h2 className={`text-2xl text-white`}>
                                    Connect Wallet!
                                </h2>
                            </div>
                        </button>
                    </>
                }

            </div>

            <div className="mb-[70px]">
                <div className="flex flex-col items-center">
                    <Link href="./leaderboard">
                        <h2 className="text-white font-semibold text-[30px]">
                            Leaderboard
                        </h2>
                    </Link>
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
