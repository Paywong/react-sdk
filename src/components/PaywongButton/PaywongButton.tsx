import React from 'react';

export interface IPaywongButton {
  label: string;
}

const PaywongButton = (props: IPaywongButton) => {
  return <button>{process.env.REACT_APP_PAYWONG_PUBLIC_TOKEN}</button>;
};

export default PaywongButton;
