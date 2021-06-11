import {get} from 'lodash';
export function errorCodeExists(graphqlErrors, errorCode) {
  let exists = false;
  graphqlErrors.forEach((e) => {
    const code = get(e, 'extensions.code');
    if (code && code === errorCode) {
      exists = true;
    }
  });
  return exists;
}
