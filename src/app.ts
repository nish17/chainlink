import Web3 from 'web3';

import {PROXISES} from './constants';
import {Crypto, IPrice} from './types';
import {getAssetPriceOf, prettyPrintResult, printErrors} from './utils';

const INTERVAL = process.env.INTERVAL
  ? parseInt(process.env.INTERVAL, 10)
  : 5000; // in milliseconds
async function fetchPrices(web3: Web3): Promise<void> {
  try {
    const Promises = Object.entries(PROXISES).map(async entry => {
      const [assetName, address] = entry;
      return getAssetPriceOf(web3, assetName as Crypto, address);
    });
    const results = await Promise.allSettled(Promises);
    const priceOfSuccessfullAssets: IPrice[] = (
      results.filter(
        result => result.status === 'fulfilled'
      ) as PromiseFulfilledResult<IPrice>[]
    ).map(result => result.value);
    const errors = (
      results.filter(
        result => result.status === 'rejected'
      ) as PromiseRejectedResult[]
    ).map(error => error.reason);

    prettyPrintResult(priceOfSuccessfullAssets);
    printErrors(errors);
  } catch (err) {
    console.error('Something went wrong while fetching asset prices:\n', err);
  }
}

export default async function startFetching(web3: Web3) {
  await fetchPrices(web3);
  setInterval(async () => await fetchPrices(web3), INTERVAL);
}
