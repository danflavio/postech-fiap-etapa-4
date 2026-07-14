import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import api from '../services/api';

export default function Home({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useFocusEffect(
    useCallback(() => {
      async function fetchPosts() {
        try {
          const response = await api.get('/posts');
          setPosts(response.data);
        } catch (error) {
          console.error("Erro ao buscar posts:", error);
        }
      }
      fetchPosts();
    }, [])
  );

  async function handleSearch() {
    try {
      const query = searchQuery.trim();
      const url = query ? `/posts/search?q=${encodeURIComponent(query)}` : '/posts';
      const response = await api.get(url);
      setPosts(response.data);
    } catch (error) {
      console.error("Erro na busca:", error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginButtonText}>Login do Professor</Text>
        </TouchableOpacity>
      </View>
      
      <TextInput
        style={styles.input}
        placeholder="Buscar posts..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
      />
      
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
  container: { flex: 1, padding: 20, backgroundColor: '#F5F0EB' },
  topBar: { flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 15 },
  loginButton: { backgroundColor: '#8B9CC4', paddingVertical: 10, paddingHorizontal: 18, borderRadius: 10 },
  loginButtonText: { color: '#fff', fontWeight: '600', fontSize: 14 },
  input: { borderWidth: 1, borderColor: '#D6CFC7', backgroundColor: '#fff', padding: 12, marginBottom: 20, borderRadius: 10 },
  card: { padding: 15, borderWidth: 1, borderColor: '#E8E1D9', marginBottom: 15, borderRadius: 10, backgroundColor: '#fff' },
  title: { fontWeight: 'bold', fontSize: 18, marginBottom: 5, color: '#4A4A4A' },
  author: { color: '#8B8B8B', marginBottom: 10 }
});
