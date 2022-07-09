import Web3 from 'web3';
import {AbiItem} from 'web3-utils';
import {Contract} from 'web3-eth-contract';

import {Crypto, IPrice} from './types';
import {ABI} from './constants';


export async function getAssetPriceOf(
  web3: Web3,
  asset: Crypto,
  address: string
): Promise<IPrice> {
  try {
    const contract: Contract = new web3.eth.Contract(ABI as AbiItem[], address);
    const [price, decimals] = await Promise.all([
      contract.methods.latestRoundData().call(),
      contract.methods.decimals().call(),
    ]);
    const finalPrice = parseInt(price.answer) / Math.pow(10, decimals);
    return {
      asset,
      price: finalPrice,
    };
  } catch (err) {
    err.asset = asset;
    throw err;
  }
}

export function prettyPrintResult(priceOfAllAssets: IPrice[]): void {
  console.log('\n\n');
  priceOfAllAssets.forEach(result =>
    console.log(`${result.asset} / USD => ${result.price}`)
  );
  console.log('\n\n');
}

export function printErrors(errors) {
  errors.forEach(error => {
    console.log(`${error.asset} / USD => ${error.message}`);
  });
}
