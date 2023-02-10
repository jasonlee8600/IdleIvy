import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import SideNav from 'components/SideNav.js'

export default function Yale() {
  return (
    <>
      <Head>
        <title>IdleYale</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className='flex-row'>
          <SideNav highlight={"Yale"}> </SideNav>
          
          <div className='flex flex-col bg-[#202B64] h-screen items-center justify-center'>
            <h1 className='text-[#DADADA]'>Yale Page</h1>
            <h2 className='text-white'>Join Game!</h2>
          </div>

      </div>
    </>
  )
}
