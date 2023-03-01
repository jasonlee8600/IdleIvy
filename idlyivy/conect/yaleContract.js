import { Contract } from '@ethersproject/contracts';
import Yale from '../conect/Yale.json' 

export const contractAddress = '0x7bb42fab83559C0EbfEf9aa0D204f7a8D0AFAf5a';

export const getContract = (library, account) => {
	const signer = library.getSigner(account).connectUnchecked();
	var contract = new Contract(contractAddress, Yale.abi, signer);
	return contract;
};

 