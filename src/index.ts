import Web3 from 'web3';
import dotenv from 'dotenv';
import fetchPrices from './app';
dotenv.config();

const providerUrl = `${process.env.ALCHEMY_URL_HTTPS}/${process.env.ALCHEMY_APIKEY}`;
const web3 = new Web3(providerUrl);

web3.eth.net
  .isListening()
  .then()
  .then(() => {
    console.log(
      'Connection was Successful!\nStarting to Fetch Asset Prices....'
    );
    fetchPrices(web3);
  })
  .catch(e => console.log('Something went wrong: ' + e));
