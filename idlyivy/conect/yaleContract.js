import { Contract } from '@ethersproject/contracts';
import Yale from '../conect/Yale.json' 

export const contractAddress = '0x8C256a9A6c874d91109D8bb6b3fFa52345cC9569';

export const getContract = (library, account) => {
	const signer = library.getSigner(account).connectUnchecked();
	var contract = new Contract(contractAddress, Yale.abi, signer);
	return contract;
};

