import {
  JsonRpcProvider,
  Transaction,
  TransactionResponse,
  TransactionReceipt,
  BrowserProvider,
  Signer,
} from "ethers";

let accountsPromise: any = null;
let signerPromise: any = null;

const provider = new JsonRpcProvider("http://localhost:8545");
const walletProvider = new BrowserProvider(window.web3.currentProvider);

export const getSigner = () => signerPromise ? signerPromise: signerPromise = walletProvider.getSigner();
export const getAccounts = () => accountsPromise ? accountsPromise: accountsPromise = provider.listAccounts();
