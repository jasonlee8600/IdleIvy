import { Contract } from '@ethersproject/contracts';
import Wait from '../conect/Wait.json' 

export const contractAddress = '0xb5588C411ba0bb7D38865fdC51D082d004e519F7';

export const getContract = (library, account) => {
	const signer = library.getSigner(account).connectUnchecked();
	var contract = new Contract(contractAddress, Wait.abi, signer);
	return contract;
};

 