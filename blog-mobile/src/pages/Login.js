import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { isAuthenticated, login } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigation.reset({ index: 0, routes: [{ name: 'Admin' }] });
    }
  }, [isAuthenticated]);

  async function handleLogin() {
    try {
      await login(email.trim(), senha);
    } catch {
      Alert.alert('Erro', 'E-mail ou senha inválidos!');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Acesso Restrito</Text>

      <Text style={styles.label}>E-mail:</Text>
      <TextInput
        style={styles.input}
        placeholder="seu@email.com"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <Text style={styles.label}>Senha:</Text>
      <TextInput
        style={styles.input}
        placeholder="senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.backButtonText}>Voltar para a Home</Text>
      </TouchableOpacity>

      <Text style={styles.hint}>
        Professor padrão: admin@fiap.com.br / admin123
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#F5F0EB' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#4A4A4A' },
  label: { fontSize: 14, marginBottom: 4, fontWeight: '600', color: '#6B6B6B' },
  input: { borderWidth: 1, borderColor: '#D6CFC7', backgroundColor: '#fff', padding: 12, marginBottom: 15, borderRadius: 10 },
  loginButton: { backgroundColor: '#85B4D1', paddingVertical: 14, borderRadius: 10, alignItems: 'center' },
  loginButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  backButton: { marginTop: 15, paddingVertical: 14, borderRadius: 10, alignItems: 'center', borderWidth: 1.5, borderColor: '#8B9CC4' },
  backButtonText: { color: '#8B9CC4', fontSize: 15, fontWeight: '600' },
  hint: { textAlign: 'center', color: '#aaa', fontSize: 12, marginTop: 20 }
});
