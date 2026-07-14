import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import api from '../services/api';

export default function EditTeacher({ route, navigation }) {
  const { id } = route.params;
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  useEffect(() => {
    async function fetchTeacher() {
      try {
        const response = await api.get(`/professores/${id}`);
        setNome(response.data.nome);
        setEmail(response.data.email);
      } catch (error) {
        console.error("Erro ao buscar dados do professor:", error.message);
      }
    }
    fetchTeacher();
  }, [id]);

  async function handleUpdate() {
    try {
      const body = { nome, email };
      if (senha) body.senha = senha;
      await api.put(`/professores/${id}`, body);
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

      <Text style={styles.label}>Nova senha (deixe em branco para manter):</Text>
      <TextInput style={styles.input} value={senha} onChangeText={setSenha} secureTextEntry placeholder="Nova senha" />

      <TouchableOpacity style={styles.saveButton} onPress={handleUpdate}>
        <Text style={styles.saveButtonText}>Salvar Alterações</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F5F0EB' },
  label: { fontSize: 15, marginBottom: 5, fontWeight: '600', color: '#4A4A4A' },
  input: { borderWidth: 1, borderColor: '#D6CFC7', backgroundColor: '#fff', padding: 12, marginBottom: 15, borderRadius: 10 },
  saveButton: { backgroundColor: '#94C19D', paddingVertical: 14, borderRadius: 10, alignItems: 'center', marginTop: 5 },
  saveButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' }
});
