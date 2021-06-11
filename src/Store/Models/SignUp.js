import {action, thunk} from 'easy-peasy';
import client from '../../Apollo/ApolloClient';
import {REGISTER_USER_MUTATION} from '../../Apollo/Auth/mutation';
import {APP_STATE, STATUS} from '../../Constants';
import NavigationService from '../../Navigation';

import Routes from '../../Navigation/Routes';
import BaseModel from './Base';

const signUpUser = thunk(async (actions, payload, {dispatch}) => {
  if (
    !payload.firstName ||
    !payload.lastName ||
    !payload.email ||
    !payload.password
  ) {
    return;
  }
  actions.updateStatus(STATUS.FETCHING);
  try {
    await client.mutate({
      mutation: REGISTER_USER_MUTATION,
      variables: {
        input: {
          role: 'serviceSeeker',
          firstName: payload.firstName,
          lastName: payload.lastName,
          password: payload.password,
          email: payload.email,
        },
      },
    });

    NavigationService.navigate(Routes.LOGIN_SCREEN);
  } catch (error) {
    actions.updateStatus(STATUS.FAILED);
    console.log(error.graphQLErrors[0]);
  }
});

const SignUpModel = {
  //include BaseModel
  ...BaseModel(),
  //include all thunks or actions defined separately
  signUpUser,
  appstate: APP_STATE.UNKNOWN,
  changeAppState: action((signUpState, payload) => {
    signUpState.appstate = payload;
  }),
  onSignUpInputChange: action((signUpState, {key, value}) => {
    signUpState[key] = value;
  }),
};

export default SignUpModel;
