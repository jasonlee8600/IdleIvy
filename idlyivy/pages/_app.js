import '../styles/globals.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Provider } from 'react-redux'
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

import * as ga from '../lib/ga'

function MyApp({ Component, pageProps }) {
	const getLibrary = (provider) => {
		const library = new Web3Provider(provider, 'any');
		library.pollingInterval = 15000;
		return library;
	};
	const router = useRouter()
	useEffect(() => {
		const handleRouteChange = (url) => {
		  ga.pageview(url)
		}
		//When the component is mounted, subscribe to router changes
		//and log those page views
		router.events.on('routeChangeComplete', handleRouteChange)
	
		// If the component is unmounted, unsubscribe
		// from the event with the `off` method
		return () => {
		  router.events.off('routeChangeComplete', handleRouteChange)
		}
	  }, [router.events])
  return (
	<Web3ReactProvider getLibrary={getLibrary}>
		<Component {...pageProps} />
	</Web3ReactProvider>

  )
}

export default MyApp