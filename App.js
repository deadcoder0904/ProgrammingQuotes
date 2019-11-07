import {ApolloProvider} from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text} from 'react-native';
import {CreateQuote} from './components/CreateQuote';
import {ListQuotes} from './components/ListQuotes';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
});

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <ApolloProvider client={client}>
        <SafeAreaView>
          <Text style={styles.text}>Programming Quotes</Text>
          <CreateQuote />
          <ListQuotes />
        </SafeAreaView>
      </ApolloProvider>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    margin: 10,
  },
});

export default App;
