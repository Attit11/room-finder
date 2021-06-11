const config = {
  //   locale:
  //     window.localStorage && window.localStorage.getItem
  //       ? window.localStorage.getItem('locale')
  //       : 'en',
  //   IS_CONSOLE_ALLOWED: true,
  API_URL: 'https://workernetwork8848.herokuapp.com/s/api/v1',
  WEBSITE_URL: 'https://techdurbar.com',
  GRAPHQL_ENDPOINT: 'https://workernetwork8848.herokuapp.com/graphql',
  //   GRAPHQL_SUBSCRIPTION_ENDPOINT:
  //     'wss://workernetwork8848.herokuapp.com/subscriptions',
};
// if (process.env.NODE_ENV === 'production') {
//   config.IS_CONSOLE_ALLOWED = false;
//   //   config.GRAPHQL_ENDPOINT = "";
//   //   config.GRAPHQL_SUBSCRIPTION_ENDPOINT = "";
// }
// // console.log(process.env); // eslint-disable-line
// if (process.env.REACT_APP_SERVER_TEST) {
//   config.GRAPHQL_ENDPOINT = 'http://localhost:5000/graphql';
//   config.GRAPHQL_SUBSCRIPTION_ENDPOINT = 'ws://localhost:5000/subscriptions';
//   config.API_URL = 'http://localhost:5000/s/api/v1';
// }
export default config;
