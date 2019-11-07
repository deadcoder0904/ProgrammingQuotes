import {gql} from 'apollo-boost';

export const DELETE_QUOTE_MUTATION = gql`
  mutation deleteQuote($id: ID) {
    deleteQuote(where: {id: $id}) {
      id
    }
  }
`;
