import Image from "next/image";
import { useWeb3React } from "@web3-react/core";

function TopInfo({ title, balance, mintable, busiStats, joinGame, rate, mint }) {
    
  const web3reactContext = useWeb3React();
  
  
  return (

            <div className='md:hidden flex flex-col items-center pt-4'>
                <h1 className='text-white text-4xl text-center'>Yale Idle Token</h1>
                <h2 className='text-white text-2xl text-center py-4'>Balance: {balance / 10}</h2>
                
                
                {busiStats[0]['time'] ?
                <>
                  <h2 className='text-white text-xl text-center pb-4'>Rate: {rate} tokens / min</h2>
                  <button className="bg-[#202B64] py-4 px-8 rounded-full outline outline-white outline-[3px]"
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
                {web3reactContext.account != undefined ?
                <button className='bg-[#dadada] w-1/3 self-center rounded-md text-black text-xl text-center p-4' onClick={joinGame}>Join game!</button>
                :
                <h2 className='text-white text-xl text-center'>Connect Wallet Above!</h2>
                }
                </>  
                }
            </div>

            );
        }

export default TopInfo;