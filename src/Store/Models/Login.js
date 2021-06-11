import {action, thunk} from 'easy-peasy';
import {ApiService} from '../../Store';
import {
  setLoginCredentials,
  getLoginCredentials,
  resetLoginCredentials,
} from '../../Services/Keychain';
import {STATUS} from '../../Constants';
import {APP_STATE} from '../../Constants/index';
import BaseModel from './Base';

import {showErrorToast, showLoading} from '../../Lib/Toast';
import client from '../../Apollo/ApolloClient';
import {LOGIN_MUTATION} from '../../Apollo/Auth/mutation';
import NavigationService from '../../Navigation';
import Routes from '../../Navigation/Routes';

const checkLogin = thunk(async (actions, payload, {dispatch, injections}) => {
  const {api} = injections;

  const credentials = await getLoginCredentials();
  if (credentials) {
    // api.setAuthorizationHeader(credentials.access_token);
    //dispatch.user.requestUserProfile();
    // console.warn('cred', credentials);
    actions.changeAppState(APP_STATE.PRIVATE);
    actions.mergeState(credentials);
  } else {
    actions.changeAppState(APP_STATE.PUBLIC);
  }
});

const loginUser = thunk(async (actions, payload, {dispatch}) => {
  if (!payload.username || !payload.password) {
    return;
  }
  actions.updateStatus(STATUS.FETCHING);

  // let response = await ApiService.loginUser(payload);
  try {
    const user = await client.mutate({
      mutation: LOGIN_MUTATION,
      variables: {
        email: payload.username,
        password: payload.password,
      },
    });

    actions.changeAppState(APP_STATE.PRIVATE);
    await setLoginCredentials(
      payload.username,
      payload.password,
      user.data.login.jwt,
    );
    actions.updateStatus(STATUS.SUCCESS);
    NavigationService.navigate(Routes.MAIN_APP);
  } catch (error) {
    showErrorToast(error?.graphQLErrors[0]?.message);
    actions.updateStatus(STATUS.FAILED);
  }

  //mocking api
  // setTimeout(() => {
  //   actions.updateStatus(response.status ? STATUS.SUCCESS : STATUS.FAILED);
  //   if (!response.status) {
  //     console.warn(response.error);
  //   } else {
  //     actions.changeAppState(APP_STATE.PRIVATE);
  //   }
  // }, 1000);

  // 	ApiService.setAuthorizationHeader(response.data.access_token);
  // 	dispatch.user.requestUserProfile();
});

const LoginModel = {
  //include BaseModel
  ...BaseModel(),
  //include all thunks or actions defined separately
  loginUser,
  checkLogin,
  appstate: APP_STATE.UNKNOWN,
  changeAppState: action((state, payload) => {
    state.appstate = payload;
  }),
  onLoginInputChange: action((state, {key, value}) => {
    state[key] = value;
  }),
};

export default LoginModel;
