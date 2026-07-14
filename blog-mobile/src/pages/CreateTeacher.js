import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import api from '../services/api';

export default function CreateTeacher({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  async function handleCreate() {
    try {
      await api.post('/professores', { nome, email });
      Alert.alert('Sucesso', 'Professor cadastrado com sucesso!');
      navigation.goBack();
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

      <TouchableOpacity style={styles.saveButton} onPress={handleCreate}>
        <Text style={styles.saveButtonText}>Salvar Professor</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F5F0EB' },
  label: { fontSize: 16, marginBottom: 5, fontWeight: '600', color: '#4A4A4A' },
  input: { borderWidth: 1, borderColor: '#D6CFC7', backgroundColor: '#fff', padding: 12, marginBottom: 15, borderRadius: 10 },
  saveButton: { backgroundColor: '#94C19D', paddingVertical: 14, borderRadius: 10, alignItems: 'center', marginTop: 5 },
  saveButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' }
});
