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
  DEVELOPMENT = 'development',
  STAGING = 'staging',
  SANDBOX = 'sandox',
  PRODUCTION = 'production',
}

export interface ButtonOptions {
  buttonStyle?: any;
  containerStyle?: any;
  text?: string;
}

export interface IPaywongButton {
  amount: AmountInput;
  items?: PaymentItemInput[];
  paymentOptions?: PaymentOptionsInput;
  receiverAddresses?: ReceiverAddressesInput[];
  environment: PaywongEnvironment | undefined;
  buttonOptions?: ButtonOptions;
}
