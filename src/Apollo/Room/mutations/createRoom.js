import {gql} from '@apollo/client';

export const CREATE_ROOM_MUTATION = gql`
  mutation createRoom($input: RoomCreateInput!) {
    createRoom(input: $input) {
      _id
    }
  }
`;
