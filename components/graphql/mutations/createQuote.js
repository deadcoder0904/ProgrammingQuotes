import {gql} from 'apollo-boost';

export const CREATE_QUOTE_MUTATION = gql`
  mutation createQuote($author: String!, $content: String!) {
    createQuote(data: {author: $author, content: $content}) {
      id
      content
      author
    }
  }
`;
