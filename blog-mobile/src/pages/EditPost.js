import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import api from '../services/api';

export default function EditPost({ route, navigation }) {
  const { id } = route.params;
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await api.get(`/posts/${id}`);
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setContent(response.data.content);
      } catch (error) {
        console.error("Erro ao buscar o post:", error);
      }
    }
    fetchPost();
  }, [id]);

  async function handleUpdate() {
    try {
      await api.put(`/posts/${id}`, { title, author, content });
      Alert.alert('Sucesso', 'Post atualizado com sucesso!');
      navigation.navigate('Home');
    } catch (error) {
      console.error("Erro ao atualizar post:", error);
      Alert.alert('Erro', 'Não foi possível atualizar o post.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título:</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />

      <Text style={styles.label}>Autor:</Text>
      <TextInput style={styles.input} value={author} onChangeText={setAuthor} />

      <Text style={styles.label}>Conteúdo:</Text>
      <TextInput 
        style={[styles.input, { height: 100 }]} 
        value={content} 
        onChangeText={setContent} 
        multiline 
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleUpdate}>
        <Text style={styles.saveButtonText}>Salvar Alterações</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F5F0EB' },
  label: { fontSize: 16, marginBottom: 5, fontWeight: '600', color: '#4A4A4A' },
  input: { borderWidth: 1, borderColor: '#D6CFC7', backgroundColor: '#fff', padding: 12, marginBottom: 15, borderRadius: 10 },
  saveButton: { backgroundColor: '#85B4D1', paddingVertical: 14, borderRadius: 10, alignItems: 'center', marginTop: 5 },
  saveButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' }
});
