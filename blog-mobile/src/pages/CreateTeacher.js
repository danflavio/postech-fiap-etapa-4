import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import api from '../services/api';

export default function CreateTeacher({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  async function handleCreate() {
    try {
      await api.post('/professores', { nome, email });
      Alert.alert('Sucesso', 'Professor cadastrado com sucesso!');
      navigation.goBack(); // Volta para a lista após salvar
    } catch (error) {
      console.error("Erro ao cadastrar professor:", error);
      Alert.alert('Erro', 'Não foi possível cadastrar o professor.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome:</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} />

      <Text style={styles.label}>E-mail:</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />

      <Button title="Salvar Professor" onPress={handleCreate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontSize: 16, marginBottom: 5, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 }
});