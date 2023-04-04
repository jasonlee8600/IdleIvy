import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import SideNav from 'components/SideNav.js'
import Item from '@/components/Item'
import buttery from "public/buttery.jpeg"
import sterling from "public/sterling.jpeg"
import yaleBowl from "public/yalebowl.jpeg"
import handsomeDan from "public/handsomedan.jpeg"
import Web3 from "web3";
import Yale from "../conect/Yale.json"
import { contractAddress, getContract } from "../conect/yaleContract";
import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import Wallet from '@/components/Wallet'
import TopNav from '@/components/TopNav'
import TopInfo from '@/components/TopInfo'


export default function Contract() {

    
    const [balance, setBalance] = useState(1);
    const [rate, setRate] = useState(1);
    const [busiStats, setBusiStats] = useState([{}]);
    const [userStats, setUserStats] = useState({});
    const [mintable, setMintable] = useState(1);
	  const [loaded, setLoaded] = useState(false);
    const web3reactContext = useWeb3React();

    //console.log("WHat is this: ", web3reactContext)
    
    useEffect(() => {
        
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
      //if (web3reactContext.account != undefined && (userStats['resets'] != undefined && userStats['resets'] != 0)) {
        //console.log("Hello")
        const interval = setInterval(() => {
          setMintable(mintable + (10 * rate));
        }, 60000);
  
        return () => {
          clearInterval(interval);
        };
      //}
   });
	
	
	async function init(){
        console.log("hitting init")
        console.log("account: ", web3reactContext.account)
		try {
        
      if (web3reactContext.account != undefined) {
				
        const YaleContract = await getContract(
					web3reactContext.library,
					web3reactContext.account
				);

				const balance = parseInt(await YaleContract.balanceOf(web3reactContext.account))

        var userData = {baseMult: 0, resets:0, pastDue:0, debt:0}
          
        var tmpUserStats = await YaleContract.UserStats(web3reactContext.account)
        console.log("tmpUserStats: ",tmpUserStats)
        userData['baseMult'] = parseInt(tmpUserStats[0])
        userData['resets'] = parseInt(tmpUserStats[1])
        userData['pastDue'] = parseInt(tmpUserStats[2])
        userData['debt'] = parseInt(tmpUserStats[3])
        
        var busiData = [
          {mult: 0, quantity:0, rate:0, time:0},
          {mult: 0, quantity:0, rate:0, time:0},
          {mult: 0, quantity:0, rate:0, time:0},
          {mult: 0, quantity:0, rate:0, time:0}
        ]
        
        var tmpRate = 0
        
        for(var i = 0; i<4; i += 1) {
          var tmpBusiStats = await YaleContract.Users(web3reactContext.account,i)
          //console.log("Rate: ", parseInt(tmpUserStats[0]))
          busiData[i]['mult'] = parseInt(tmpBusiStats[0])
          busiData[i]['quantity'] = parseInt(tmpBusiStats[1])
          busiData[i]['rate'] = parseInt(tmpBusiStats[2])
          busiData[i]['time'] = parseInt(tmpBusiStats[3])

          tmpRate += (busiData[i]['mult'] * busiData[i]['quantity'] * userData['baseMult'])
          console.log("i: ", i)
          console.log("mult: ", busiData[i]['mult'])
          console.log("quantity: ", busiData[i]['quantity'])
          console.log("basemult: ", userData['baseMult'])

        }

				if (busiData[0]['time'] != 0) {
          var tmpMintable = parseInt(await YaleContract.mintableCoin())
          setMintable(tmpMintable)
        }
        else {
          setMintable(0)
        }
				
        console.log("Hitting here")
        setBalance(balance)
        setRate(tmpRate)
        setBusiStats(busiData)
        setUserStats(userData)
				setLoaded(true)
			}
			else {
        setBalance(0)
        setRate(0)
        setBusiStats([
          {mult: 0, quantity:0, rate:0, time:0},
          {mult: 0, quantity:0, rate:0, time:0},
          {mult: 0, quantity:0, rate:0, time:0},
          {mult: 0, quantity:0, rate:0, time:0}
        ])
        setMintable(0)
        setLoaded(true)
			}
    } catch (error) {
        console.log(error);
    }
	}
	
  function reload(){
		window.location.reload(false);
	}

  async function joinGame() {
    
    if (web3reactContext.account != undefined) {
      const YaleContract = getContract(
          web3reactContext.library,
          web3reactContext.account
      );

      
      try {
        let joining = await YaleContract.joinGame();

        await joining.wait();

        init();
      }
      catch (error) {
        console.log(error)
      }
    }
}

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

async function payToEarn() {
    
    if(web3reactContext.account != undefined) { 
      
      const YaleContract = getContract(
        web3reactContext.library,
        web3reactContext.account
      );

      if (userStats['baseMult'] > 0) {
          
        try {
          
          /*const web3 = new Web3()

          const yaleToken = new web3.eth.Contract(Yale.abi, contractAddress)
          
          console.log("yaleToken: ", yaleToken)
          
          const amount = Web3.utils.toWei('0.1', 'ether');

          yaleToken.methods.payToUpgradeMult().call({from: web3reactContext.address})*/
          
          const amount = Web3.utils.toWei('0.1', 'ether');
          
          let pay = await YaleContract.payToUpgradeMult().call({value: amount});
  
          await pay.wait();
  
          init();
          }
        catch (error) {
          console.log(error)
        }
      }
      else {
          console.log("Need to join game")
      }
      
  }
  else {
      console.log("Not connected")
  }
      
}
    
    

  return (
    <>
      <Head>
        <title>IdleYale</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Goldman&display=swap" rel="stylesheet" />
      </Head>
      
      
    <>
      
    {loaded ?
      <div className='font-display'>  
        <div className='flex flex-row justify-between'>
          <SideNav page="Yale" image={"../yalelogo.svg"} balance={balance} 
            rate={rate} mintable={mintable} init={init} joinGame={joinGame} 
            user={userStats} payToEarn={payToEarn}>
          </SideNav>
          
          <div className="flex flex-col w-full h-fill bg-[url('../public/yalebg.jpeg')] bg-cover border-l-[5px] border-white 2xl:h-screen">
            
            <TopNav title="Yale" init={init} reload={reload}></TopNav>
            <TopInfo
              title="Yale" balance={balance} mintable={mintable} busiStats={busiStats} 
              joinGame={joinGame} rate={rate} mint={mint} payToEarn={payToEarn}>
            </TopInfo>

            <div className="flex flex-col w-full gap-[75px] mt-16 2xl:gap-[100px] mt-20">
              <Item 
                title="Buttery" desc="For students who don't sleep" image={buttery} 
                busi={busiStats[0]} busiNum={0} init={init} balance={balance} user={userStats}>
                web3reactContext={web3reactContext}
              </Item>
              <Item 
                title="Sterling Library" desc="For students who want to sleep" image={sterling} 
                busi={busiStats[1]} busiNum={1} init={init} balance={balance} user={userStats}>
                web3reactContext={web3reactContext}
              </Item>
              <Item 
                title="Yale Bowl" desc="For students that don't study" image={yaleBowl} 
                busi={busiStats[2]} busiNum={2} init={init} balance={balance} user={userStats}>
                web3reactContext={web3reactContext}
              </Item>
              <Item
                title="Handsome Dan" desc="For all students" image={handsomeDan} 
                busi={busiStats[3]} busiNum={3} init={init} balance={balance} user={userStats}>
                web3reactContext={web3reactContext}
              </Item>
            </div>
          </div>
        </div>

      </div> 

      :
      <>
      
      <TopNav title="Yale" init={init} reload={reload}></TopNav>
      <a>Something went wrong</a>

      </>
    }

    </>
   
    </>
  )
}
