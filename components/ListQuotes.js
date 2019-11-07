import {useMutation, useQuery} from '@apollo/react-hooks';
import React from 'react';
import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
import {Error} from './Error';
import {DELETE_QUOTE_MUTATION} from './graphql/mutations/deleteQuote';
import {GET_QUOTES_QUERY} from './graphql/queries/quotes';
import {Loading} from './Loading';

const removeQuote = (id, deleteQuote) => {
  deleteQuote({
    variables: {
      id,
    },
    update: (cache, {data}) => {
      const {quotes} = cache.readQuery({
        query: GET_QUOTES_QUERY,
      });
      cache.writeQuery({
        query: GET_QUOTES_QUERY,
        data: {
          quotes: quotes.filter(quote => quote.id !== id),
        },
      });
    },
  });
};

export const ListQuotes = () => {
  const {loading, error, data} = useQuery(GET_QUOTES_QUERY);
  const [deleteQuote] = useMutation(DELETE_QUOTE_MUTATION);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }
  const quotes = data.quotes;
  return (
    <View style={styles.container}>
      {!quotes.length ? (
        <Text>No quotes in the database. Add one :)</Text>
      ) : (
        <FlatList
          data={quotes}
          renderItem={({item}) => {
            return (
              <View style={styles.quoteWrapper}>
                <Text style={styles.content}>“{item.content}”</Text>
                <Text style={styles.author}> – {item.author}</Text>
                <Button
                  color="#ff0000"
                  title="Delete"
                  onPress={() => removeQuote(item.id, deleteQuote)}
                />
              </View>
            );
          }}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  quoteWrapper: {
    margin: 8,
  },
  content: {
    fontSize: 16,
    color: '#3E4C59',
  },
  author: {
    marginTop: 2,
    marginBottom: 2,
    fontSize: 14,
    color: '#616E7C',
  },
});
