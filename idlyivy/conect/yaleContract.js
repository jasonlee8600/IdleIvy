import { Contract } from '@ethersproject/contracts';
import Yale from '../conect/Yale.json' 

export const contractAddress = '0x567Bb784fAA71F50081437804A031e350047B1F8';

export const getContract = (library, account) => {
	const signer = library.getSigner(account).connectUnchecked();
	var contract = new Contract(contractAddress, Yale.abi, signer);
	return contract;
};

 