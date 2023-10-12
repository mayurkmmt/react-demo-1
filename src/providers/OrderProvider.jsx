import React, { createContext, useContext, useState } from 'react';

import createClient from '../api';
import {
  useApiCall,
  useMountCall,
} from '../hooks';


const initialState = {
  order: null,
  promo: null,
  loading: false,
};

const Context = createContext(initialState);

// Provider

const OrderProvider = ({ baseURL, locale, children }) => {
  const client = createClient({ baseURL, locale });
  const [order, setOrder] = useState(null);
  const [promo, setPromo] = useState(null);

  return (
    <Context.Provider
      value={{
        client,
        order,
        setOrder,
        promo,
        setPromo,
      }}
    >
      {children}
    </Context.Provider>
  );
};

// External API

const useOrderContext = () => useContext(Context);

const useVerifyPromoCode = () => {
  const { client, setPromo } = useOrderContext();

  return useApiCall({
    onSuccess: setPromo,
  }, client.verifyPromo);
};

const useCreateOrder = () => {
  const { client, setOrder } = useOrderContext();

  return useApiCall({
    onSuccess: setOrder,
  }, client.createOrder);
};

const useRequestOrder = (code) => {
  const { client, setOrder } = useOrderContext();

  return useMountCall({
    onSuccess: setOrder,
  }, () => client.getOrder(code));
};

const useAcceptReview = () => {
  const { client, setOrder } = useOrderContext();

  return useApiCall({
    onSuccess: setOrder,
  }, (code) => client.acceptReview(code));
};

const useRejectReview = () => {
  const { client, setOrder } = useOrderContext();

  return useApiCall({
    onSuccess: setOrder,
  }, (code) => client.rejectReview(code));
};

// Exports

export default OrderProvider;
export {
  useOrderContext,
  useVerifyPromoCode,
  useRequestOrder,
  useAcceptReview,
  useRejectReview,
  useCreateOrder,
};
