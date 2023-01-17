interface AmountInput {
    currencyId: string;
    price: number;
    discount?: number;
    insurance?: number;
    shipping?: number;
    tax?: number;
}
interface PaymentItemInput {
    imageUrl?: string;
    name: string;
    price: number;
    quantity: number;
    sku?: string;
    tax?: number;
}
interface PaymentOptionsInput {
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
interface ReceiverAddressesInput {
    address: string;
    chainId: string;
}
declare enum PaywongEnvironment {
    DEVELOPMENT = "DEVELOPMENT",
    STAGING = "STAGING",
    SANDBOX = "SANDBOX",
    PRODUCTION = "PRODUCTION"
}
interface IPaywongButton {
    amount: AmountInput;
    items?: PaymentItemInput[];
    paymentOptions?: PaymentOptionsInput;
    receiverAddresses?: ReceiverAddressesInput[];
    environment?: PaywongEnvironment;
}

declare const PaywongButton: ({ amount, items, paymentOptions, receiverAddresses, environment, }: IPaywongButton) => JSX.Element;

export { PaywongButton };
