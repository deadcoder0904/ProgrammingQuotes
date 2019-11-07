import {useMutation} from '@apollo/react-hooks';
import React, {useState} from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';
import {Error} from './Error';
import {CREATE_QUOTE_MUTATION} from './graphql/mutations/createQuote';
import {GET_QUOTES_QUERY} from './graphql/queries/quotes';

const saveQuote = (quote, author, changeQuote, changeAuthor, createQuote) => {
  if (quote.trim() === '' || author.trim() === '') {
    return;
  }
  createQuote({
    variables: {
      content: quote,
      author,
    },
    update: (cache, {data}) => {
      const {quotes} = cache.readQuery({
        query: GET_QUOTES_QUERY,
      });

      cache.writeQuery({
        query: GET_QUOTES_QUERY,
        data: {
          quotes: quotes.concat(data.createQuote),
        },
      });
    },
  });
  changeQuote('');
  changeAuthor('');
};

export const CreateQuote = () => {
  const [quote, changeQuote] = useState('');
  const [author, changeAuthor] = useState('');
  const [createQuote, {error, data}] = useMutation(CREATE_QUOTE_MUTATION);
  if (error) {
    return <Error />;
  }
  return (
    <View style={styles.wrapper}>
      <TextInput
        style={styles.textInput}
        placeholder="Enter the quote"
        onChangeText={quoteValue => changeQuote(quoteValue)}
        value={quote}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Enter the author"
        onChangeText={authorValue => changeAuthor(authorValue)}
        value={author}
      />
      <Button
        title="Save Quote"
        color="#3E4C59"
        onPress={() =>
          saveQuote(quote, author, changeQuote, changeAuthor, createQuote)
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    margin: 8,
  },
  textInput: {
    borderWidth: 1,
    marginTop: 4,
    marginBottom: 4,
    padding: 8,
    fontSize: 16,
    color: '#3E4C59',
  },
});
