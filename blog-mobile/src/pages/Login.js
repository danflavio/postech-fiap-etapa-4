import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';

export default function Login({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin() {
    // Validação simples utilizando as credenciais padrão do projeto
    if (username === 'professor' && password === '123456') {
      navigation.replace('Home'); // Usa replace para não permitir voltar para a tela de login
    } else {
      Alert.alert('Erro', 'Credenciais inválidas. Tente novamente.');
    }
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.card}>
        <Text style={styles.title}>BlogFIAP</Text>
        <Text style={styles.subtitle}>Acesso restrito para professores</Text>

        <TextInput
          style={styles.input}
          placeholder="Usuário"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          placeholderTextColor="#888"
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#888"
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f9', justifyContent: 'center', padding: 20 },
  card: { backgroundColor: '#fff', padding: 25, borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#333', textAlign: 'center', marginBottom: 5 },
  subtitle: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 30 },
  input: { backgroundColor: '#fafafa', borderWidth: 1, borderColor: '#ddd', padding: 15, borderRadius: 8, marginBottom: 15, fontSize: 16, color: '#333' },
  button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});