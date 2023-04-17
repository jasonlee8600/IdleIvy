import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';

const RPC_URLS = {
	1: 'https://mainnet.infura.io/v3/55d040fb60064deaa7acc8e320d99bd4',
	941: 'https://rpc.v2b.testnet.pulsechain.com',
	942: 'https://rpc.v3.testnet.pulsechain.com'
};

//metamask
export const injected = new InjectedConnector({
	supportedChainIds: [ 1, 941, 942 ]
});


export const walletconnect = new WalletConnectConnector({
	rpc: {
		1: RPC_URLS[1],
	},
	qrcode: true,
	pollingInterval: 13000
});



export function resetWalletConnector(connector) {
	if (connector && connector instanceof WalletConnectConnector) {
		connector.walletConnectProvider = undefined;
	}
}

//coinbase
export const walletlink = new WalletLinkConnector({
	url: RPC_URLS[4],
	appName: 'demo-app',
	supportedChainIds: [ 1, 4 ]
});

;

