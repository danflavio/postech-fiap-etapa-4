import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';

export default function Login({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin() {
    if (username.trim() === 'professor' && password === '123456') {
      navigation.navigate('Admin');
    } else {
      Alert.alert('Erro', 'Usuário ou senha incorretos!');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Acesso Restrito</Text>
      
      <TextInput 
        style={styles.input} 
        placeholder="Usuário" 
        value={username} 
        onChangeText={setUsername} 
        autoCapitalize="none" 
      />
      
      <TextInput 
        style={styles.input} 
        placeholder="Senha" 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry 
      />
      
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Entrar</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.backButtonText}>Voltar para a Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#F5F0EB' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#4A4A4A' },
  input: { borderWidth: 1, borderColor: '#D6CFC7', backgroundColor: '#fff', padding: 12, marginBottom: 15, borderRadius: 10 },
  loginButton: { backgroundColor: '#85B4D1', paddingVertical: 14, borderRadius: 10, alignItems: 'center' },
  loginButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  backButton: { marginTop: 15, paddingVertical: 14, borderRadius: 10, alignItems: 'center', borderWidth: 1.5, borderColor: '#8B9CC4' },
  backButtonText: { color: '#8B9CC4', fontSize: 15, fontWeight: '600' }
});
