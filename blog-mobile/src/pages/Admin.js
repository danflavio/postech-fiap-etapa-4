import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity, Button } from 'react-native';
import api from '../services/api';

export default function Admin({ navigation }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const response = await api.get('/posts');
      setPosts(response.data);
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
    }
  }

  async function handleDelete(id) {
    try {
      await api.delete(`/posts/${id}`);
      Alert.alert('Sucesso', 'Postagem removida!');
      fetchPosts(); 
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível remover a postagem.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Painel Administrativo</Text>
      
      {/* Botões de Gestão organizados aqui */}
      <View style={styles.buttonGroup}>
        <Button title="Nova Postagem" onPress={() => navigation.navigate('CreatePost')} />
        <Button title="Professores" color="#28a745" onPress={() => navigation.navigate('TeacherList')} />
        <Button title="Estudantes" color="#ff9500" onPress={() => navigation.navigate('StudentList')} />
      </View>

      <Text style={styles.subHeader}>Gerenciar Postagens Publicadas</Text>
      
      <FlatList
        data={posts}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('EditPost', { id: item.id })}>
                <Text style={styles.editButton}>Editar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Text style={styles.deleteButton}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  subHeader: { fontSize: 16, fontWeight: 'bold', marginTop: 10, marginBottom: 10, color: '#444' },
  buttonGroup: { gap: 10, marginBottom: 20 },
  card: { padding: 15, borderWidth: 1, borderColor: '#eee', marginBottom: 10, borderRadius: 8, backgroundColor: '#f9f9f9' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#333' },
  buttonContainer: { flexDirection: 'row', justifyContent: 'flex-end', gap: 20 },
  editButton: { color: '#007AFF', fontWeight: 'bold', fontSize: 16 },
  deleteButton: { color: '#FF3B30', fontWeight: 'bold', fontSize: 16 }
});