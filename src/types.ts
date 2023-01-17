export interface AmountInput {
  currencyId: string;
  price: number;
  discount?: number;
  insurance?: number;
  shipping?: number;
  tax?: number;
}

export interface PaymentItemInput {
  imageUrl?: string;
  name: string;
  price: number;
  quantity: number;
  sku?: string;
  tax?: number;
}

export interface PaymentOptionsInput {
  allowedTokens: string[];
  cancelUrl?: string;
  isRequiredBilling?: boolean;
  isRequiredShippingAddress?: boolean;
  orderDescription?: string;
  orderId?: string;
  paymentDueAt?: Date;
  qrCodeSize?: number;
  returnUrl?: String;
  webhookUrl?: String;
}

export interface ReceiverAddressesInput {
  address: string;
  chainId: string;
}

export enum PaywongEnvironment {
  DEVELOPMENT = 'DEVELOPMENT',
  STAGING = 'STAGING',
  SANDBOX = 'SANDBOX',
  PRODUCTION = 'PRODUCTION',
}

export interface IPaywongButton {
  amount: AmountInput;
  items?: PaymentItemInput[];
  paymentOptions?: PaymentOptionsInput;
  receiverAddresses?: ReceiverAddressesInput[];
  environment?: string;
}
