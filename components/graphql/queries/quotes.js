import {gql} from 'apollo-boost';

export const GET_QUOTES_QUERY = gql`
  query quotes {
    quotes {
      id
      content
      author
    }
  }
`;
