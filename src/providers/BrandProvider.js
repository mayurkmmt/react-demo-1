import React, { createContext, useContext, useState } from 'react';

import createClient from '../api';
import { useMountCall } from '../hooks';

const initialState = {
  client: null,
  brands: null,
  loading: false,
};

const Context = createContext(initialState);

// Provider

const BrandProvider = ({ baseURL, locale, children }) => {
  const client = createClient({ baseURL, locale });
  const [brands, setBrands] = useState(null);

  return (
    <Context.Provider
      value={{
        brands,
        setBrands,
        client,
        locale,
      }}
    >
      {children}
    </Context.Provider>
  );
};

// External API

const useBrandContext = () => useContext(Context);

const useRequestBrands = () => {
  const { client, setBrands } = useBrandContext();

  return useMountCall({
    onSuccess: (resp) => setBrands(resp),
  }, client.listBrands);
};

// Exports

export default BrandProvider;
export {
  useBrandContext,
  useRequestBrands,
};
