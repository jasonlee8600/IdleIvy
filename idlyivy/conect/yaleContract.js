import { Contract } from '@ethersproject/contracts';
import Yale from '../conect/Yale.json' 

export const contractAddress = '0x926398b482685F327f7fCcFa9d6529D7bDcCF476';

export const getContract = (library, account) => {
	const signer = library.getSigner(account).connectUnchecked();
	var contract = new Contract(contractAddress, Yale.abi, signer);
	return contract;
};

