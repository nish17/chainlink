import Web3 from 'web3';
import {AbiItem} from 'web3-utils';
import {Contract} from 'web3-eth-contract';

import {Crypto, ICovertFromTo, IPrice} from './types';
import {ABI} from './constants';

export function getENSName(asset: string, fiat: string): string {
  return `${asset.toLowerCase()}-${fiat.toLowerCase()}.data.matic`;
}

export async function getAddressFromENS(
  web3: Web3,
  conversions: ICovertFromTo[]
) {
  const addrPromises = conversions.map(
    async conversion =>
      await web3.eth.ens.getAddress(getENSName(conversion.from, conversion.to))
  );
  const allAddress = await Promise.all(addrPromises);
  console.log('🚀 > getAddressFromENS > allAddress', allAddress);
}

export async function getAssetPriceOf(
  web3: Web3,
  asset: Crypto,
  address: string
): Promise<IPrice> {
  const contract: Contract = new web3.eth.Contract(ABI as AbiItem[], address);
  return {
    asset,
    price: await contract.methods.latestRoundData().call(),
  };
}

export function prettyPrintResult(priceOfAllAssets: IPrice[]): void {
  console.log('\n\n');
  priceOfAllAssets.forEach(result =>
    console.log(`${result.asset} / USD => ${result.price.answer}`)
  );
  console.log('\n\n');
}
