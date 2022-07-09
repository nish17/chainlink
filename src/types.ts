export enum Crypto {
  AAVE = 'AAVE',
  BTC = 'BTC',
  ETH = 'ETH',
  LINK = 'LINK',
  MATIC = 'MATIC',
};

export interface IPrice {
  asset: Crypto;
  price: Number;
};
