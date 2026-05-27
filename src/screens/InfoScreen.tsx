// src/screens/InfoScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const InfoScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Lobb</Text>
      <Text style={styles.body}>
        Lobb is a modern food‑discovery app built with React Native. It showcases meals from TheMealDB, lets you favorite dishes, add them to a cart, and provides a clean, compact UI.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 12,
    color: '#00695c',
  },
  body: {
    fontSize: 16,
    lineHeight: 22,
    color: '#333',
  },
});

export default InfoScreen;
