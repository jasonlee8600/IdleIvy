import { Contract } from '@ethersproject/contracts';
import Yale from '../conect/Yale.json' 

export const contractAddress = '0xC57C5aC5cDBFe5d77A4Dd539205Bc07dF0930533';

export const getContract = (library, account) => {
	const signer = library.getSigner(account).connectUnchecked();
	var contract = new Contract(contractAddress, Yale.abi, signer);
	return contract;
};

 