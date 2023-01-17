import React from 'react';
import { createPayment } from '../../services/graphql';
import { PaywongEnvironment, IPaywongButton } from '../../types';

const PaywongButton = ({
  amount,
  items,
  paymentOptions,
  receiverAddresses,
  environment = PaywongEnvironment.PRODUCTION,
  buttonOptions,
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

  const style = {
    fontWeight: '500',
    padding: '10px 24px',
    lineHeight: '0',
    fontSize: '18px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    gap: '10px',
    textAlign: 'center',
    background: '#4b4efc',
    color: '#ffff',
    display: 'flex',
    aligntems: 'center',
    justifyContent: 'center',
    width: '230px',
    height: '48px',
    fontFamily: 'inter',
    ...buttonOptions?.style,
  };

  return (
    <button style={style} disabled={!token} onClick={handleCreatePayment}>
      {buttonOptions?.text ? buttonOptions?.text : 'Pay with Crypto'}
    </button>
  );
};

export default PaywongButton;
