import React, { createContext, useContext, useState } from 'react';

import createClient from '../api';
import { useApiCall } from '../hooks';

const initialState = {
  order: null,
  loading: false,
};

const Context = createContext(initialState);

// Provider

const LogitsticsProvider = ({ baseURL, locale, children }) => {
  const client = createClient({ baseURL, locale });
  const [slots, setSlots] = useState(null);

  return (
    <Context.Provider
      value={{
        client,
        slots,
        setSlots,
        resetSlots: () => setSlots(null),
      }}
    >
      {children}
    </Context.Provider>
  );
};

// External API

const useLogitsticsContext = () => useContext(Context);

const useRequestSlots = () => {
  const { client, setSlots } = useLogitsticsContext();

  return useApiCall({
    onSuccess: (slots) => {
      console.log('slots: ', slots)
      debugger;
      setSlots(slots.reduce((acc, { id, availableSlots }) => ([
        ...acc,
        ...availableSlots.map(({ start, end, last }) => ({
          id,
          start,
          end,
          last,
        })),
      ]), []));
    },
  }, client.getSlots);
};

// Exports

export default LogitsticsProvider;
export {
  useLogitsticsContext,
  useRequestSlots,
};
