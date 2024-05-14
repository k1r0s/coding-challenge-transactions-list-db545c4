import { takeEvery } from "redux-saga/effects";
import {
  JsonRpcProvider,
  Transaction,
  TransactionResponse,
  TransactionReceipt,
  BrowserProvider,
  Signer,
} from "ethers";

import apolloClient from "../apollo/client";
import { Actions, Action, SendTransactionForm } from "../types";
import { SaveTransaction } from "../queries";
import { getSigner } from "../services";

async function sendTransaction(action: Action<SendTransactionForm>) {

  const signer = await getSigner();

  const transaction = {
    to: action.payload.to,
    value: parseInt(action.payload.amount),
  };

  try {
    const txResponse: TransactionResponse = await signer.sendTransaction(transaction);
    const receipt: TransactionReceipt | null = await txResponse.wait();

    if (!receipt) throw "null receipt";

    const variables = {
      transaction: {
        gasLimit: (txResponse.gasLimit && txResponse.gasLimit.toString()) || "0",
        gasPrice: (txResponse.gasPrice && txResponse.gasPrice.toString()) || "0",
        to: txResponse.to,
        from: txResponse.from,
        value: (txResponse.value && txResponse.value.toString()) || "",
        data: txResponse.data || null,
        chainId: (txResponse.chainId && txResponse.chainId.toString()) || "123456",
        hash: txResponse.hash,
      },
    };

    await apolloClient.mutate({
      mutation: SaveTransaction,
      variables,
    });
  } catch (error) {
    console.log("sendTransaction error!", error);
  }
}

export function* rootSaga() {
  yield takeEvery(Actions.SendTransaction, sendTransaction);
}
