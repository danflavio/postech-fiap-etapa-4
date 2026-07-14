import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export default function Admin({ navigation }) {
  const [posts, setPosts] = useState([]);
  const { logout } = useAuth();

  useFocusEffect(
    useCallback(() => {
      fetchPosts();
    }, [])
  );

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

  function handleLogout() {
    logout();
    navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Painel Administrativo</Text>
      
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#85B4D1' }]} onPress={() => navigation.navigate('CreatePost')}>
          <Ionicons name="add-circle-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Nova Postagem</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#94C19D' }]} onPress={() => navigation.navigate('TeacherList')}>
          <Ionicons name="people-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Professores</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#EDC28A' }]} onPress={() => navigation.navigate('StudentList')}>
          <Ionicons name="school-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Estudantes</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={18} color="#D9ACB5" />
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>

      <Text style={styles.subHeader}>Gerenciar Postagens Publicadas</Text>
      
      <FlatList
        data={posts}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity onPress={() => navigation.navigate('PostDetail', { id: item.id })}>
              <Text style={styles.title}>{item.title}</Text>
            </TouchableOpacity>
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('EditPost', { id: item.id })}>
                <Ionicons name="create-outline" size={22} color="#85B4D1" />
              </TouchableOpacity>
              
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Ionicons name="trash-outline" size={22} color="#D9ACB5" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F5F0EB' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, textAlign: 'center', color: '#4A4A4A' },
  subHeader: { fontSize: 16, fontWeight: '600', marginTop: 10, marginBottom: 10, color: '#6B6B6B' },
  buttonGroup: { gap: 10, marginBottom: 20 },
  button: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 12, paddingHorizontal: 20, borderRadius: 10 },
  buttonText: { color: '#fff', fontSize: 15, fontWeight: '600' },
  card: { padding: 15, borderWidth: 1, borderColor: '#E8E1D9', marginBottom: 10, borderRadius: 10, backgroundColor: '#fff' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#4A4A4A' },
  buttonContainer: { flexDirection: 'row', justifyContent: 'flex-end', gap: 24 },
  logoutButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 10 },
  logoutText: { color: '#D9ACB5', fontWeight: '600', fontSize: 15 }
});
