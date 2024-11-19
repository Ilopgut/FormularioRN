import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function WelcomeScreen({ route }){
  const { name } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido/a!</Text>
      <Text style={styles.message}>
        Gracias por registrarte, {name}. Tu cuenta ha sido creada exitosamente.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666',
  },
});

export default WelcomeScreen;