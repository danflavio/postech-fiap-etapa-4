import React from "react";
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
// Dados estáticos temporários para testarmos o visual
const posts = [
  { id: '1', title: 'Primeiro Post', author: 'Professor A', description: 'Resumo do post 1' },
  { id: '2', title: 'Segundo Post', author: 'Professor B', description: 'Resumo do post 2' },
];

export default function Home({ navigation }) { // <-- Adicione navigation aqui
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Buscar posts..." />
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('PostDetail')}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>Autor: {item.author}</Text>
            <Text>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 40 },
  input: { borderWidth: 1, padding: 10, marginBottom: 20, borderRadius: 5 },
  card: { padding: 15, borderWidth: 1, marginBottom: 10, borderRadius: 5 },
  title: { fontWeight: 'bold', fontSize: 18 }
});