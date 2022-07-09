import Web3 from 'web3';

import {PROXISES} from './constants';
import {Crypto, IPrice} from './types';
import {getAssetPriceOf, prettyPrintResult} from './utils';

const INTERVAL = process.env.INTERVAL || 5000; // in milliseconds
async function fetchPrices(web3: Web3): Promise<void> {
  try {
    const Promises = Object.entries(PROXISES).map(async entry => {
      const [assetName, address] = entry;
      return getAssetPriceOf(web3, assetName as Crypto, address);
    });
    const priceOfAllAssets: IPrice[] = await Promise.all(Promises);
    prettyPrintResult(priceOfAllAssets);
  } catch (err) {
    console.error('Something went wrong while fetching asset prices:\n', err);
  }
}

export default async function startFetching(web3: Web3) {
  await fetchPrices(web3);
  setInterval(async () => await fetchPrices(web3), INTERVAL as number);
}
