import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import api from '../services/api';

export default function CreatePost({ navigation }) {
  // Estados para guardar o que for digitado no formulário
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  // Função que envia os dados para a sua API Node.js
  async function handleCreate() {
    try {
      await api.post('/posts', { title, author, content });
      Alert.alert('Sucesso', 'Post criado com sucesso!');
      navigation.navigate('Home'); // Volta para a tela inicial após salvar
    } catch (error) {
      console.error("Erro ao criar post:", error);
      Alert.alert('Erro', 'Não foi possível criar o post.');
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

      <Button title="Salvar Postagem" onPress={handleCreate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontSize: 16, marginBottom: 5, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 }
});