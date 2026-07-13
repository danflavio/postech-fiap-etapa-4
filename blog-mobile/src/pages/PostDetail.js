import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PostDetail() {
  return (
    <View style={styles.container}>
      <Text>Conteúdo completo do post aparecerá aqui!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' }
});