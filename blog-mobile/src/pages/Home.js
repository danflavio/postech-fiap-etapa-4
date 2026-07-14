import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import api from '../services/api';

export default function Home({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      fetchPosts();
      return;
    }
    const timer = setTimeout(() => searchPosts(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  async function fetchPosts() {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/posts');
      setPosts(response.data);
    } catch (err) {
      setError('Erro ao carregar posts. Verifique sua conexão.');
    } finally {
      setLoading(false);
    }
  }

  async function searchPosts(query) {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/posts/search?q=${encodeURIComponent(query)}`);
      setPosts(response.data);
    } catch {
      setError('Erro ao buscar posts.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar posts..."
        value={search}
        onChangeText={setSearch}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#e94560" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('PostDetail', { postId: item.id })}
            >
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.meta}>Autor: {item.author}</Text>
              <Text numberOfLines={3}>{item.content}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 20, borderRadius: 5, borderColor: '#ccc' },
  card: { padding: 15, borderWidth: 1, marginBottom: 10, borderRadius: 5, borderColor: '#ddd' },
  title: { fontWeight: 'bold', fontSize: 18, marginBottom: 4 },
  meta: { color: '#666', marginBottom: 8 },
  error: { color: 'red', textAlign: 'center', marginTop: 20 },
});
