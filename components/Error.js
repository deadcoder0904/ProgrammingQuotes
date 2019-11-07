import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const Error = () => (
  <View>
    <Text style={styles.error}>Error...</Text>
  </View>
);

const styles = StyleSheet.create({
  error: {
    color: 'red',
  },
});
