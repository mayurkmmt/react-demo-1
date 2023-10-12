import axios from 'axios';

const createClient = ({
  baseURL = 'http://127.0.0.1:8000/api/',
  locale = 'en',
  debug = false,
}) => {
  const client = axios.create({
    baseURL,
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: 'X-CSRFToken',
    headers: {
      'Accept-Language': locale,
    },
  });

  client.interceptors.request.use((request) => {
    if (debug) {
      console.log(request);
    }
    return request;
  });

  const request = async (config) => {
    try {
      const { data } = await client(config);
      return data;
    } catch (e) {
      console.log('error', e);
      throw Error('client error');
    }
  };

  const get = (url, _authenticate, params) => (
    request({
      method: 'get',
      url,
      params,
    })
  );

  const post = (url, authenticate, data) => (
    request({
      method: 'POST',
      data,
      url,
      authenticate,
    })
  );

  return {
    getSlots: (postalCode, noPrinter = false) => get('/slots/', true, {
      postal_code: postalCode,
      no_printer: noPrinter,
    }),
    verifyPromo: (promoCode) => get(`/promos/${promoCode}/verify/`),
    createOrder: (data) => post('/orders/', true, data),
    acceptReview: (code) => post(`/orders/${code}/accept/`, true),
    rejectReview: (code) => post(`/orders/${code}/reject/`, true),
    getOrder: (code) => get(`/orders/${code}/`),
    listBrands: () => get('/brands/'),
  };
};

export default createClient;
