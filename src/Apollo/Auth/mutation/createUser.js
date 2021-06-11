import {gql} from '@apollo/client';

export const CREATE_USER_MUTATION = gql`
  mutation createUser($input: UserCreateInput!) {
    createUser(input: $input) {
      _id
    }
  }
`;
