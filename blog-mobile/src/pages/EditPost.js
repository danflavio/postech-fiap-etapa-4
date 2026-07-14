import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import api from '../services/api';

export default function EditPost({ route, navigation }) {
  const { id } = route.params; // Recebe o ID do post a ser editado
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  // Busca os dados atuais do post para preencher o formulário
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

  // Envia as alterações para a API
  async function handleUpdate() {
    try {
      await api.put(`/posts/${id}`, { title, author, content });
      Alert.alert('Sucesso', 'Post atualizado com sucesso!');
      navigation.navigate('Home'); // Retorna para a tela inicial
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

      <Button title="Salvar Alterações" onPress={handleUpdate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontSize: 16, marginBottom: 5, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 }
});
