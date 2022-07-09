# Nodejs app uses Chainlink Data Feed

### A simple nodejs app which fetches USD prices of digital assets like BTC, ETH, MATIC, LIN and AAVE from Chainlink Polygon Mainnet.

### How to run locally?
```sh
# install all the dependencies
$ npm install

# run
$ npm start
```

## 🧠 Learnings?
- web3 providers gives us the ability to interact with the Blockchain Node. I started experimenting using Infura which was based on ethereum, but as I was curious about Polygon, then moved to Alchemy, which gives the polygon mainnet provider.
- We can also run a local private blockchain using Ganache.

## ❗Known Issues
- Because of the nature of Promise.all(), the whole fetch result fails if any one of the network request for asset price is failing.
- The price we are getting is not in decimal form.

## ❤️ Credits

- [Chainlink](https://chain.link)
- [Alchemy](https://alchemy.com/)
- [Infura](https://infura.io/)
- [Polygon](https://www.polygon.technology/)

## 🎓 License

MIT