import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';
import api from '../services/api';

export default function StudentList({ navigation }) {
  const [students, setStudents] = useState([]);

  useEffect(() => { fetchStudents(); }, []);

  async function fetchStudents() {
    try {
      const response = await api.get('/alunos');
      setStudents(response.data);
    } catch (error) { console.error("Erro:", error); }
  }

  async function handleDelete(id) {
    try {
      await api.delete(`/alunos/${id}`);
      fetchStudents();
    } catch (error) { console.error("Erro ao deletar:", error); }
  }

  return (
    <View style={styles.container}>
      <Button title="Cadastrar Novo Aluno" onPress={() => navigation.navigate('CreateStudent')} />
      <FlatList
        data={students}
        keyExtractor={item => String(item.id)}
        style={{ marginTop: 20 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.nome}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('EditStudent', { id: item.id })}>
                <Text style={styles.editButton}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Text style={styles.deleteButton}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  card: { padding: 15, borderWidth: 1, borderColor: '#eee', marginBottom: 10, borderRadius: 8, backgroundColor: '#f9f9f9' },
  name: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#333' },
  buttonContainer: { flexDirection: 'row', justifyContent: 'flex-end', gap: 20 },
  editButton: { color: '#007AFF', fontWeight: 'bold', fontSize: 16 },
  deleteButton: { color: '#FF3B30', fontWeight: 'bold', fontSize: 16 }
});