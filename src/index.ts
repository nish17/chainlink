import Web3 from 'web3';
import dotenv from 'dotenv';
import startFetching from './app';
dotenv.config();

const providerUrl = `${process.env.ALCHEMY_URL_HTTPS}/${process.env.ALCHEMY_APIKEY}`;
const web3 = new Web3(providerUrl);

async function main() {
  const result = await web3.eth.net.isListening();
  if (result) {
    console.log(
      'Connection was Successful!\nStarting to Fetch Asset Prices....'
    );
    await startFetching(web3);
  }
}

main().catch(console.error);
