import {
  ApolloClient,
  IntrospectionFragmentMatcher,
  InMemoryCache,
  ApolloLink,
} from 'apollo-boost';
import * as Keychain from 'react-native-keychain';
import {WebSocketLink} from 'apollo-link-ws';
import ApolloLinkTimeout from 'apollo-link-timeout';
import {setContext} from 'apollo-link-context';
import {onError} from 'apollo-link-error';
import QueueLink from 'apollo-link-queue';
import NetInfo from '@react-native-community/netinfo';
import {createUploadLink} from 'apollo-upload-client';
import {RetryLink} from 'apollo-link-retry';
import {getMainDefinition} from 'apollo-utilities';
import result from './Generated/fragmentTypes.json';
import {errorCodeExists} from '../Utils/ServerUtils';
import {showErrorToast} from '../Lib/Toast';
import {StoreService} from '../Store';
import {APP_STATE} from '../Constants';
const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: result,
});

// const ROOT_PATH = 'de1c3d0f5551.ngrok.io';
const ROOT_PATH = 'workernetwork8848.herokuapp.com';
const cache = new InMemoryCache({
  fragmentMatcher,
  // @ts-ignore: Unreachable code
  dataIdFromObject: (o) => (o._id ? `${o.__typename}:${o._id}` : null),
  // dataIdFromObject: o => {
  //   // console.log('cache', o);
  //   return `${o.__typename}: ${o._id || o.id}`;
  // },
});
const errorLink = onError((errors) => {
  // console.log('APOLLO_ERROR', errors);
  if (errors && errors.graphQLErrors) {
    const {graphQLErrors} = errors;
    const isOrgDeactivated = errorCodeExists(
      graphQLErrors,
      'ORGANIZATION_DEACTIVATED',
    );
    if (
      errorCodeExists(graphQLErrors, 'UNAUTHENTICATED') ||
      errorCodeExists(graphQLErrors, 'INVALID_TOKEN') ||
      isOrgDeactivated
    ) {
      if (isOrgDeactivated) {
        showErrorToast(
          // t('yourAccountIsDeactivated'),
          'Account is deactivated',
          5000,
        );
      } else {
        showErrorToast('Invalid Token', 5000);
        // TODO: move to keychaing service
        Keychain.resetGenericPassword('socialAppLogin');
        Keychain.resetGenericPassword('socialAppJWT');
        const actions = StoreService.getActions();
        actions.login.changeAppState(APP_STATE.UNKNOWN);
      }
      // resetAuthKeys(); // TODO: reset keychain
      // if (getCurrentScreen() !== screens.login) { // TODO: logout on faile
      //   resetNavigate(screens.login);
      // }
    }
  }
});
const queueLink = new QueueLink();
NetInfo.addEventListener((state) => {
  if (state.isConnected) {
    queueLink.open();
  } else {
    queueLink.close();
  }
});
const authLink = setContext(async (req, {headers}) => {
  const credentials = await Keychain.getGenericPassword('room_finderJWT');
  // console.log('keychain get data ', credentials);
  let token = '';
  if (credentials && credentials.password) {
    token = credentials.password;
  }
  return {
    ...headers,
    headers: {authorization: token ? `Bearer ${token}` : ''},
  };
});
const wsLink = new WebSocketLink({
  uri: `wss://${ROOT_PATH}/subscriptions`,
  options: {
    reconnect: true,
    connectionParams: async () => {
      const credentials = await Keychain.getGenericPassword('room_finderJWT');
      let token = '';
      if (credentials && credentials.password) {
        token = credentials.password;
      }
      return {
        authorization: token,
      };
    },
  },
});
const uploadLink = createUploadLink({
  uri: `https://${ROOT_PATH}/graphql`,
});
const splittedLink = new RetryLink().split(
  ({query}) => {
    const {kind, operation} = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  uploadLink,
);
const timeoutLink = new ApolloLinkTimeout(35000);
const link = authLink.concat(
  ApolloLink.from([
    // apolloLogger,
    timeoutLink,
    errorLink,
    queueLink,
    splittedLink,
  ]),
);
const client = new ApolloClient({
  link,
  cache,
  // resolvers,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
  },
});
cache.writeData({
  data: {},
});
export default client;
