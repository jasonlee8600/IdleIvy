import Image from "next/image";
import { useWeb3React } from "@web3-react/core";
import { getContract } from "../conect/yaleContract";
import { useState, useEffect } from "react";
import Pending from '@/components/Pending'

function Item({ title, desc, image, busi, busiNum, init, balance, user}) {
    
  //Consts for user wallet connection and business info
  const web3reactContext = useWeb3React();
  const [cost, setCost] = useState(2)
  const [busiCost, setBusiCost] = useState(2)
  const [pending, setPending] = useState(false);
  
  useEffect(() => {
    loadBusi()
  });

  //Function to set business information for components
  async function loadBusi() {
    
    if(web3reactContext.account != undefined && user['resets'] > 0) {

      const YaleContract = getContract(
        web3reactContext.library,
        web3reactContext.account
      );
    
     
      if (busi['time'] != 0) {
        var tmpCost = parseInt(await YaleContract.upgradeMultCost(busiNum))
        setCost(tmpCost)
      }
      var nextBusi = parseInt(await YaleContract.nextBusiness())
      if (nextBusi == busiNum) {
        var tmpCost = parseInt(await YaleContract.nextBusinessCost())
        setBusiCost(tmpCost)
      }
      
    }
  }
  
  //Function to upgrade the business
  async function upgradeMult() {
        
    if(web3reactContext.account != undefined && busi['time'] != 0) {
      const YaleContract = getContract(
          web3reactContext.library,
          web3reactContext.account
      );

      var tmpCost = parseInt(await YaleContract.upgradeMultCost(busiNum))
      var mintable = parseInt(await YaleContract.mintableCoin())
        
      if (mintable + balance >= tmpCost) {
        try {
          setPending(true)
          let upgrade = await YaleContract.upgradeMult(busiNum);

          await upgrade.wait();

          init();
          setPending(false)

        }
        catch (error) {
          console.log(error)
          setPending(false)

        }
      }
      else {
        console.log("Not enough coin")
      }
    }
    else {
      console.log("Connect wallet or buy business")
    }
}

//function to unlock next business
async function unlockBusi() {
  
  if(web3reactContext.account != undefined && user['resets'] != 0) {
    const YaleContract = getContract(
        web3reactContext.library,
        web3reactContext.account
    );

    var nextBusi = parseInt(await YaleContract.nextBusiness())
    var tmpCost = parseInt(await YaleContract.nextBusinessCost())
    var mintable = parseInt(await YaleContract.mintableCoin())
      
    if ((nextBusi == busiNum) && (mintable + balance >= tmpCost)) {
      try {
        setPending(true)

        let unlock = await YaleContract.unlockNextBusiness();

        await unlock.wait();

        init();
        setPending(false)

      }
      catch (error) {
        console.log(error)
        setPending(false)

      }
    }
    else {
      console.log("Not enough coin or unlock previous businesses first")
    }
  }
  else {
    console.log("Connect wallet or join game")
  }
}
  
  return (
          <>
            <Pending pending={pending}></Pending>
            <div className='flex flex-row ml-[100px]'>
              <Image alt="Buttery" src={image} width={150} height={90} className="rounded-full outline outline-white outline-[4px]"></Image>
              
              <div className='flex flex-row w-full pl-12'>
                
                <div className='flex flex-row z-0 bg-gradient-to-b from-[#272727] to-[#797979] h-[90px] w-5/6 rounded-full outline outline-white outline-[4px]'>
                  
                    {busi['time'] != 0 ?
                      <button type="button" className="self-start z-10 bg-[#202B64] h-[90px] w-1/4 rounded-full outline outline-white outline-[4px] text-2xl text-white"
                        onClick={upgradeMult}>
                          Buy
                        <h3 className="text-xl">Cost: {cost/10}</h3> 
                      </button>
                    :
                      <button type="button" className="self-start z-10 bg-[#202B64] h-[90px] w-1/4 rounded-full outline outline-white outline-[4px] text-2xl text-white"
                        onClick={unlockBusi}>
                          {busiCost != 2 ?
                            <div>
                              <h3>Buy</h3>
                              <h3 className="text-xl">Cost: {busiCost/10}</h3>
                            </div>
                          : 
                            <h3>Locked</h3>
                          }
                      </button>
                    }
                  
                    <div className='flex flex-col justify-center w-4/5'>
                        <h3 className={`text-2xl text-white text-center`}>{title}: {busi['mult']}</h3>
                        <h4 className={`text-lg text-white text-center`}>{desc}</h4>
                        <h4 className={`text-lg text-white text-center`}>Rate: {busi['mult'] * busi['quantity']} / minute</h4>
                    </div>
                </div>
              </div>
            </div>
          </>

            );
        }

export default Item;