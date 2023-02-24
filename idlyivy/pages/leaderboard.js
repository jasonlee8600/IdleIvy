import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import SideNav from 'components/SideNav.js'
import Item from '@/components/Item'
import buttery from "public/buttery.jpeg"
import Leaderboard from '@/components/Leaderboard'

export default function Yale() {
  return (
    <>
      <Head>
        <title>IdleYale</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      
      <div>  
        <div className='flex flex-row justify-between'>
          <SideNav highlight={"Yale"}> </SideNav>
          
          <div className="flex flex-col w-full h-screen bg-[url('../public/yalebg.jpeg')] bg-cover md:ml-[250px] gap-[75px] pt-16">
            
            <Leaderboard></Leaderboard>

          </div>
        </div>

      </div> 
   
    </>
  )
}