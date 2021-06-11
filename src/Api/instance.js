import axios from 'axios';
import config from '../Config';
import {getLoginCredentials} from '../Services/Keychain';

export const authenticatedInstance = axios.create({
  baseURL: config.API_URL,
  headers: {
    authorization: getLoginCredentials()
      .then((data) => {
        return data.password;
      })
      .catch(() => {
        return '';
      }),
  },
});
export const unauthenticatedInstance = axios.create({
  baseURL: config.API_URL,
});
