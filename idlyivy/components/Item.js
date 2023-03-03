import Link from "next/link";
import Image from "next/image";
import { useWeb3React } from "@web3-react/core";
import { getContract } from "../conect/yaleContract";
import { useState, useEffect } from "react";

function Item({ title, desc, image, busi, busiNum, init, balance, user }) {
    
  const [sorry, setSorry] = useState(false)
  const [connect, setConnect] = useState(false)
  const [loaded, setLoaded] = useState(false);
  const web3reactContext = useWeb3React();
  const [cost, setCost] = useState(2)
  const [busiCost, setBusiCost] = useState(2)
  
  useEffect(() => {
    // setShowModal(true)
    init();
    if (window.ethereum) {
        window.ethereum.on("accountsChanged", function (accounts) {
            reload();
        });
        init();
    } else {
        init();
    }
}, []);
  
  
  useEffect(() => {
    loadBusi()
  });

  async function loadBusi() {
    console.log("Busi: ", user['resets'])
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
          let upgrade = await YaleContract.upgradeMult(busiNum);

          await upgrade.wait();

          init();
        }
        catch (error) {
          console.log(error)
        }
      }
      else {
        console.log("Not enough coin")
        setSorry(true)
      }
    }
    else {
      console.log("Connect wallet or buy business")
      setConnect(true)
    }
}

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
        
        let unlock = await YaleContract.unlockNextBusiness();

        await unlock.wait();

        init();
      }
      catch (error) {
        console.log(error)
      }
    }
    else {
      console.log("Not enough coin or unlock previous businesses first")
      setSorry(true)
    }
  }
  else {
    console.log("Connect wallet or join game")
    setConnect(true)
  }
}
  
  return (

            <div className='flex flex-row ml-[25px]'>
              <Image alt="Buttery" src={image} width={90} height="auto" className="rounded-full outline outline-white outline-[4px]"></Image>
              
              <div className='flex flex-row w-full pl-4'>
                
                <div className='flex flex-row z-0 bg-gradient-to-b from-[#272727] to-[#797979] h-[90px] w-5/6 rounded-full outline outline-white outline-[4px]'>
                  
                    {busi['time'] != 0 ?
                      <button type="button" className="self-start z-10 bg-[#202B64] h-[90px] w-1/4 rounded-full outline outline-white outline-[4px] text-xl text-white"
                        onClick={upgradeMult}>
                          Upgrade
                        <h3>Cost: {cost/10}</h3> 
                      </button>
                    :
                      <button type="button" className="self-start z-10 bg-[#202B64] h-[90px] w-1/4 rounded-full outline outline-white outline-[4px] text-xl text-white"
                        onClick={unlockBusi}>
                          Buy
                          {busiCost != 2 ?
                            <h3>Cost: {busiCost/10}</h3>
                          : 
                            <></>
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

            );
        }

export default Item;