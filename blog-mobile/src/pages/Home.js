import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity, Button } from 'react-native';
import api from '../services/api';

export default function Home({ navigation }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await api.get('/posts');
        setPosts(response.data);
      } catch (error) {
        console.error("Erro ao buscar posts:", error);
      }
    }
    fetchPosts();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 20 }}>
        {/* Apenas um botão discreto para a área restrita */}
        <Button title="Login do Professor" color="#333" onPress={() => navigation.navigate('Login')} />
      </View>
      
      <TextInput style={styles.input} placeholder="Buscar posts..." />
      
      <FlatList
        data={posts}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => navigation.navigate('PostDetail', { id: item.id })}
          >
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.author}>Autor: {item.author}</Text>
            <Text>{item.content}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 20, borderRadius: 8 },
  card: { padding: 15, borderWidth: 1, borderColor: '#eee', marginBottom: 15, borderRadius: 8, backgroundColor: '#f9f9f9' },
  title: { fontWeight: 'bold', fontSize: 18, marginBottom: 5 },
  author: { color: '#666', marginBottom: 10 }
});