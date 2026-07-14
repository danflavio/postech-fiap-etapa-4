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
      <View style={{ marginBottom: 20, gap: 10 }}>
        <Button title="Criar Nova Postagem" onPress={() => navigation.navigate('CreatePost')} />
        <Button title="Gerenciar Professores" color="#28a745" onPress={() => navigation.navigate('TeacherList')} />
        <Button title="Gerenciar Estudantes" color="#ff9500" onPress={() => navigation.navigate('StudentList')} />
        <Button title="Painel Admin de Posts" color="#dc3545" onPress={() => navigation.navigate('Admin')} />
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
            <Text>Autor: {item.author}</Text>
            <Text>{item.content}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 20, borderRadius: 5 },
  card: { padding: 15, borderWidth: 1, marginBottom: 10, borderRadius: 5 },
  title: { fontWeight: 'bold', fontSize: 18 }
});