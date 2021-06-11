import {create} from 'apisauce';
import config from '../../Config';
import apiMonitor from './Monitor';
//import setInterceptor from './Interceptor';

export const URIS = {
  VERSION: 'app/version',
  LOGIN: 'login',
  REFRESH: 'refresh',
  LOGOUT: 'logout',
  CREATE_ROOM: '/file/upload',
};

const createApiClient = (baseURL = config.API_URL) => {
  let api = create({
    baseURL,
    headers: {
      Accept: 'application/json',
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
    },
    timeout: 15000,
  });

  api.addMonitor(apiMonitor);
  // use interceptor if using oAuth for authentication
  // setInterceptor(api);

  const setAuthorizationHeader = (access_token) =>
    api.setHeader('Authorization', 'Bearer ' + access_token);

  const loginUser = (payload) => api.post(URIS.LOGIN, payload);

  const UploadImageToCreateRoom = (payload) =>
    api.post(URIS.CREATE_ROOM, payload);

  //kickoff our api functions
  return {
    UploadImageToCreateRoom,
    // client modifiers
    setAuthorizationHeader,
    // checkAppVersion,
    loginUser,
  };
};

export default {createApiClient};
