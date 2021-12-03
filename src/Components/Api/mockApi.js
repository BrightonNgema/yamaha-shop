import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import applyWarrantyMocks from './Mocks/Warranty';
import applyNewsMocks from './Mocks/News';

let api = null;

function log(...args) {
  if (process.env.NODE_ENV === 'development') {

  }
}

export const configureMockApi = baseURL => {
  api = axios.create({ baseURL });
  // eslint-disable-next-line no-undef
  if (process.env.NODE_ENV === 'development') {
    api.interceptors.request.use(
      requestConfig => {
        const { method, url, data, headers } = requestConfig;
        log(`🤔 ${method.toUpperCase()} "${baseURL}${url}"`, { data, headers }); // eslint-disable-line no-console
        return requestConfig;
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
  }
  // mock midleware while we do not have a backend.
  const mockAdapter = new MockAdapter(api, { delayResponse: 400 });
  applyWarrantyMocks(mockAdapter);
  applyNewsMocks(mockAdapter);
  // allow request to fall through to the real api.
  mockAdapter.onAny().passThrough();
};

export default () => api;
