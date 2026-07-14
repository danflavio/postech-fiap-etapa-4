import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import api from '../services/api';

export default function EditStudent({ route, navigation }) {
  const { id } = route.params;
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    async function fetchStudent() {
      try {
        const response = await api.get(`/alunos/${id}`);
        setNome(response.data.nome);
        setEmail(response.data.email);
      } catch (error) {}
    }
    fetchStudent();
  }, [id]);

  async function handleUpdate() {
    try {
      await api.put(`/alunos/${id}`, { nome, email });
      navigation.goBack();
    } catch (error) { Alert.alert('Erro', 'Ocorreu um erro.'); }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome do Aluno:</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} />
      <Text style={styles.label}>E-mail:</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} autoCapitalize="none" />
      <Button title="Salvar Alterações" onPress={handleUpdate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontSize: 16, marginBottom: 5, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 }
});