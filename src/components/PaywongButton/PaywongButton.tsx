import React from 'react';
import { createPayment } from '../../services/graphql';

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
  environment: PaywongEnvironment;
}

const PaywongButton = ({
  amount,
  items,
  paymentOptions,
  receiverAddresses,
  environment = PaywongEnvironment.SANDBOX,
}: IPaywongButton) => {
  const token = process.env.REACT_APP_PAYWONG_PUBLIC_TOKEN;

  const handleCreatePayment = async () => {
    const request = await createPayment(
      token,
      environment,
      amount,
      items,
      paymentOptions,
      receiverAddresses
    );

    if (request.success) {
      window.location.href = request.data?.paymentUrl;
    }
  };

  return (
    <button disabled={!token} onClick={handleCreatePayment}>
      {process.env.REACT_APP_PAYWONG_PUBLIC_TOKEN}
    </button>
  );
};

export default PaywongButton;
