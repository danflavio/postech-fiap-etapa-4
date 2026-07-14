import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import api from '../services/api';

export default function CreateStudent({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  async function handleCreate() {
    try {
      await api.post('/alunos', { nome, email });
      navigation.goBack();
    } catch (error) { Alert.alert('Erro', 'Ocorreu um erro.'); }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome do Aluno:</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} />
      <Text style={styles.label}>E-mail:</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} autoCapitalize="none" />

      <TouchableOpacity style={styles.saveButton} onPress={handleCreate}>
        <Text style={styles.saveButtonText}>Salvar Aluno</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F5F0EB' },
  label: { fontSize: 16, marginBottom: 5, fontWeight: '600', color: '#4A4A4A' },
  input: { borderWidth: 1, borderColor: '#D6CFC7', backgroundColor: '#fff', padding: 12, marginBottom: 15, borderRadius: 10 },
  saveButton: { backgroundColor: '#EDC28A', paddingVertical: 14, borderRadius: 10, alignItems: 'center', marginTop: 5 },
  saveButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' }
});
