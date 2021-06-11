import {gql} from '@apollo/client';

export const REGISTER_USER_MUTATION = gql`
  mutation register($input: UserRegisterInput!) {
    register(input: $input) {
      jwt
      user {
        _id
      }
    }
  }
`;
