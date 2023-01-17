import { GraphQLClient, gql } from 'graphql-request';
import {
  AmountInput,
  PaymentItemInput,
  PaymentOptionsInput,
  PaywongEnvironment,
  ReceiverAddressesInput,
} from '../components/PaywongButton/PaywongButton';
import {
  GRAPHQL_ENDPOINT_PRODUCTION,
  GRAPHQL_ENDPOINT_SANDBOX,
  GRAPHQL_ENDPOINT_STAGING,
} from '../constants';

export const createPayment = async (
  token: string | undefined,
  environment: PaywongEnvironment,
  amount: AmountInput,
  items?: PaymentItemInput[],
  paymentOptions?: PaymentOptionsInput,
  receiverAddresses?: ReceiverAddressesInput[]
) => {
  let endpoint = GRAPHQL_ENDPOINT_STAGING;
  if (environment === PaywongEnvironment.SANDBOX)
    endpoint = GRAPHQL_ENDPOINT_SANDBOX;
  if (environment === PaywongEnvironment.PRODUCTION)
    endpoint = GRAPHQL_ENDPOINT_PRODUCTION;

  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  const mutation = gql`
    mutation createPayment(
      $amount: AmountInput!
      $items: [PaymentItemInput!]
      $paymentOptions: PaymentOptionsInput
      $receiverAddresses: [ReceiverAddressInput!]
    ) {
      createPayment(
        args: {
          amount: $amount
          paymentOptions: $paymentOptions
          receiverAddresses: $receiverAddresses
          items: $items
        }
      ) {
        paymentId
        paymentUrl
      }
    }
  `;

  const variables = {
    amount,
    paymentOptions,
    receiverAddresses,
    items,
  };

  try {
    const data = await graphQLClient.request(mutation, variables);
    return {
      success: true,
      data: {
        paymentId: data.createPayment.paymentId,
        paymentUrl: data.createPayment.paymentUrl,
      },
    };
  } catch (error: any) {
    console.error({ paywongErrors: error.response.errors });
    return {
      success: false,
      errors: error.response.errors,
    };
  }
};
