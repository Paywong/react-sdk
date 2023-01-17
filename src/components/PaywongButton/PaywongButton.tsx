import React from 'react';
import { createPayment } from '../../services/graphql';
import { PaywongEnvironment, IPaywongButton } from '../../types';

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
    <div>
      <button disabled={!token} onClick={handleCreatePayment}>
        HELLO
      </button>
      <h1>Your token {token}</h1>
    </div>
  );
};

export default PaywongButton;
