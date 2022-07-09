import Web3 from 'web3';
import {AbiItem} from 'web3-utils';

import ABIs, {PROXISES} from './constants';
import {Crypto} from './types';

export default async function fetchPrices(web3: Web3): Promise<void> {
  const priceFeed = new web3.eth.Contract(
    ABIs.ETHABI as AbiItem[],
    PROXISES.AAVE
  );
  try {
    const roundData: any = await priceFeed.methods.latestRoundData().call();
    console.log(`${Crypto.AAVE}/USD: `, roundData.answer);
  } catch (err) {
    console.error('Something went wrong while fetching asset prices:\n', err);
  }
}
