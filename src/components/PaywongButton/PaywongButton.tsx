import React from 'react';
import { createPayment } from '../../services/graphql';
import { PaywongEnvironment, IPaywongButton } from '../../types';
import PaywongLogo from '../PaywongLogo';

const PaywongButton = ({
  amount,
  items,
  paymentOptions,
  receiverAddresses,
  environment = PaywongEnvironment.PRODUCTION,
  buttonOptions,
}: IPaywongButton) => {
  const token = process.env.REACT_APP_PAYWONG_PUBLIC_KEY;

  const handleCreatePayment = async () => {
    if (!token) {
      console.error({
        error: 'Invalid Paywong public key',
        message:
          'Set your Paywong public key in your .env to REACT_APP_PAYWONG_PUBLIC_KEY',
      });

      return;
    }

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

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'Inter',
    gap: '6px',
    ...buttonOptions?.containerStyle,
  };

  const buttonStyle = {
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
    alignItems: 'center',
    justifyContent: 'center',
    width: '230px',
    height: '48px',
    ...buttonOptions?.buttonStyle,
  };

  const PaywongTagStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '12px',
    color: '#9ca3af',
  };

  return (
    <div style={containerStyle}>
      <button
        style={buttonStyle}
        disabled={!token}
        onClick={handleCreatePayment}
      >
        {buttonOptions?.text ? buttonOptions?.text : 'Pay with Crypto'}
      </button>
      <div style={PaywongTagStyle}>
        <p>Powered by</p>
        <PaywongLogo />
      </div>
    </div>
  );
};

export default PaywongButton;
