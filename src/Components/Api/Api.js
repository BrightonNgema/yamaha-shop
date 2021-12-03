/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
import axios from 'axios';

let api = null;

function log(...args) {
  if (process.env.NODE_ENV === 'development') {
 
  }
}

export const configureApi = () => {
  api = axios.create({ baseURL: process.env.REACT_APP_API_URL });
  api.interceptors.request.use(
    requestConfig => {
      const { method, url, data, headers } = requestConfig;
      log(`🤔 ${method.toUpperCase()} "${process.env.REACT_APP_API_URL}${url}"`, { data, headers }); // eslint-disable-line no-console
      return { ...requestConfig, headers: { ...headers, 'Accept': 'application/json' } };
    },
    error => {
      log('❌', error); // eslint-disable-line no-console
      return Promise.reject(error);
    }
  );
  api.interceptors.response.use(
    response => {
      const {
        data,
        headers,
        config: { url, method },
      } = response;
      log(`✅ ${method.toUpperCase()} "${url}"`, { data, headers }); // eslint-disable-line no-console
      return response;
    },
    error => {
      log('❌', error); // eslint-disable-line no-console
      return Promise.reject(error);
    }
  );
};

export default () => api;
