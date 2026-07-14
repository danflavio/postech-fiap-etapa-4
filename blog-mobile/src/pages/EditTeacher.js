import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import api from '../services/api';

export default function EditTeacher({ route, navigation }) {
  const { id } = route.params;
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    async function fetchTeacher() {
      try {
        const response = await api.get(`/professores/${id}`);
        setNome(response.data.nome);
        setEmail(response.data.email);
      } catch (error) {
        console.error("Erro ao buscar dados do professor:", error);
      }
    }
    fetchTeacher();
  }, [id]);

  async function handleUpdate() {
    try {
      await api.put(`/professores/${id}`, { nome, email });
      Alert.alert('Sucesso', 'Professor atualizado com sucesso!');
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao atualizar professor:", error);
      Alert.alert('Erro', 'Não foi possível atualizar o professor.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome:</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} />

      <Text style={styles.label}>E-mail:</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />

      <Button title="Salvar Alterações" onPress={handleUpdate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontSize: 16, marginBottom: 5, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 }
});