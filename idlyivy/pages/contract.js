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
import {getUser , newUser, updateUser} from './apicalls.js'



export default function Contract() {

    
    //State variables for tracking state of user's game
    //Balance of user's tokens
    const [balance, setBalance] = useState(0);
    //Earning rate for user
    const [rate, setRate] = useState(0);
    //List of business dicts
    const [busiStats, setBusiStats] = useState([{}]);
    //Dict of user base stats
    const [userStats, setUserStats] = useState({});
    //Mintable tokens for user
    const [mintable, setMintable] = useState(0);
    //If the init loads, this is set to true and the page loads
	  const [loaded, setLoaded] = useState(false);
    //Info about user's wallet and general blockchain connection
    const web3reactContext = useWeb3React();
    
    //Reload data if anything about user wallet or connection changes
    useEffect(() => {
        
        init();
        
    }, [web3reactContext]);

    //Sets new mintable variable every minute, instead of constantly calling contract function
    useEffect(() => {

        const interval = setInterval(() => {
          setMintable(mintable + (10 * rate));
        }, 60000);
  
        return () => {
          clearInterval(interval);
        };
   });
	
	//initializing page with user data based on wallet address and connection
	async function init(){
        
		try {
        
      //if user is connected to site
      if (web3reactContext.account != undefined) {
				
        //instance of smart contract
        const YaleContract = await getContract(
					web3reactContext.library,
					web3reactContext.account
				);

				//getting token balance for user
        const balance = parseInt(await YaleContract.balanceOf(web3reactContext.account))

        //initializing user data
        var userData = {baseMult: 0, resets:0, pastDue:0, debt:0}
          
        //get base user stats from contract and set it in userData
        var tmpUserStats = await YaleContract.UserStats(web3reactContext.account)
        userData['baseMult'] = parseInt(tmpUserStats[0])
        userData['resets'] = parseInt(tmpUserStats[1])
        userData['pastDue'] = parseInt(tmpUserStats[2])
        userData['debt'] = parseInt(tmpUserStats[3])
        
        //initialize business data for four businesses
        var busiData = [
          {mult: 0, quantity:0, rate:0, time:0},
          {mult: 0, quantity:0, rate:0, time:0},
          {mult: 0, quantity:0, rate:0, time:0},
          {mult: 0, quantity:0, rate:0, time:0}
        ]
        
        //initialize with rate of 0
        var tmpRate = 0
        
        //loop through each business to calculate total rate
        for(var i = 0; i<4; i += 1) {
          var tmpBusiStats = await YaleContract.Users(web3reactContext.account,i)
          busiData[i]['mult'] = parseInt(tmpBusiStats[0])
          busiData[i]['quantity'] = parseInt(tmpBusiStats[1])
          busiData[i]['rate'] = parseInt(tmpBusiStats[2])
          busiData[i]['time'] = parseInt(tmpBusiStats[3])

          tmpRate += (busiData[i]['mult'] * busiData[i]['quantity'] * userData['baseMult'])

        }

				//if user joined game
        if (busiData[0]['time'] != 0) {
          //tokens user can mint now
          var tmpMintable = parseInt(await YaleContract.mintableCoin())
          setMintable(tmpMintable)
        }
        //user hasn't joined game
        else {
          setMintable(0)
        }
				
        //set state variable for balance and rate
        setBalance(balance)
        setRate(tmpRate)

      //Implement api call functionality updating/checking database
      //Need to add .then error checks/console logs to make sure everything works
      //use useEffect here? It doesn't work when i try to do it //TF
      // useEffect(() => {
      if (tmpRate > 0){
                  
        //check database for this user
        getUser(web3reactContext.account).then(userInfo => {

        console.log(userInfo)


        //if no such user exists
        if (userInfo.length == 0)
        {
          //NEWUSER API CALL
          //need to add something that asks for their desired nickname
          newUser(web3reactContext.account, 'FAKENICK');
          //add error checking here

        }
        //
        else if (userInfo.length == 1)
        {
          //get nickname
          //if tmprate is diff than user rate then update
          console.log(userInfo[0].rate)
          if (tmpRate > userInfo[0].rate)
          {
            console.log('updating')
            //same here, add error checking in future
            updateUser(web3reactContext.account, tmpRate);
          }
        }
        //more than two entries with the same address exist, something is wrong
        else
        {
          console.log('error, several entries for same address')
          //add code here to fix issue, maybe remove then add new user with correct data?
        }
      })
    }

        //set state variables for businesses, user, and load page
        setBusiStats(busiData)
        setUserStats(userData)
				setLoaded(true)
			}
			//user isn't connected, so all 0's but still load page
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
        //some error, check console
        console.log(error);
    }
	}
	
  function reload(){
		window.location.reload(false);
	}

  //function for user to join the game
  async function joinGame() {
    
    //need to be connected to site and not joined game yet
    if (web3reactContext.account != undefined && busiData[0]['time'] == 0) {
      const YaleContract = getContract(
          web3reactContext.library,
          web3reactContext.account
      );

      
      try {
        //contract call to join game
        let joining = await YaleContract.joinGame();
        //wait for transaction to complete
        await joining.wait();

        init();
      }
      catch (error) {
        console.log(error)
      }
    }
}

//function call to mint tokens
async function mint() {
    
    //need to be connected to site
    if(web3reactContext.account != undefined) { 

      const YaleContract = getContract(
        web3reactContext.library,
        web3reactContext.account
      );

      //anything to mint?
      if (mintable > 0) {
          try {
              //function to mint tokens
              let mint = await YaleContract.mintCoin();
              //wait for transaction to complete
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

/*
  IGNORE
  This function is not being used yet, requires more work
  async function payToEarn() {
    
    if(web3reactContext.account != undefined) { 
      
      const YaleContract = getContract(
        web3reactContext.library,
        web3reactContext.account
      );

      if (userStats['baseMult'] > 0) {
          
        try {
          
          //const web3 = new Web3()

          //const yaleToken = new web3.eth.Contract(Yale.abi, contractAddress)
          
          //console.log("yaleToken: ", yaleToken)
          
          //const amount = Web3.utils.toWei('0.1', 'ether');

          //yaleToken.methods.payToUpgradeMult().call({from: web3reactContext.address})
          
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
*/
    
    

  return (
    <>
      <Head>
        <title>IdleYale</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      
    <>
    {/* If the init function ran without error, state variable is true and page loads */}  
    {loaded ?
      <div className='font-display'>  
        <div className='flex flex-row justify-between'>
          <SideNav image={"../yalelogo.svg"} balance={balance} 
            rate={rate} mintable={mintable} init={init} joinGame={joinGame} 
            user={userStats}>
          </SideNav>
          
          <div className="flex flex-col w-full h-fill bg-[url('../public/yalebg.jpeg')] bg-cover border-l-[5px] border-white 2xl:h-screen">
            
            <TopNav init={init} reload={reload}></TopNav>
            <TopInfo
              balance={balance} mintable={mintable} busiStats={busiStats} 
              joinGame={joinGame} rate={rate} mint={mint}>
            </TopInfo>

            <div className="flex flex-col w-full gap-[75px] mt-14 2xl:gap-[100px]">
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
      
      <TopNav init={init} reload={reload}></TopNav>
      <a>Something went wrong</a>

      </>
    }

    </>
   
    </>
  )
}
