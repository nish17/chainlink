import Web3 from "web3";
import { ICovertFromTo } from "./types";

export function getENSName(asset: string, fiat: string): string {
  return `${asset.toLowerCase()}-${fiat.toLowerCase()}.data.matic`;
}

export async function getAddressFromENS(web3: Web3, conversions: ICovertFromTo[]) {
  const addrPromises =  conversions.map(async conversion => await web3.eth.ens.getAddress(getENSName(conversion.from, conversion.to)));
  const allAddress = await Promise.all(addrPromises);
  console.log("🚀 > getAddressFromENS > allAddress", allAddress);
}
