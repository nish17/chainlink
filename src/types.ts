export interface ICovertFromTo {
  from: string;
  to: string;
}

export enum Crypto {
  AAVE = 'AAVE',
  BTC = 'BTC',
  ETH = 'ETH',
  LINK = 'LINK',
  MATIC = 'MATIC',
}

export interface IPriceObject {
  roundId: string;
  answer: string;
  startAt: string;
  updatedAt: string;
  answeredInRound: string;
}

export interface IPrice {
  asset: Crypto;
  price: IPriceObject;
}
