import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import api from '../services/api';

export default function StudentList({ navigation }) {
  const [students, setStudents] = useState([]);

  useFocusEffect(
    useCallback(() => {
      fetchStudents();
    }, [])
  );

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
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('CreateStudent')}>
        <Ionicons name="person-add-outline" size={20} color="#fff" />
        <Text style={styles.addButtonText}>Cadastrar Novo Aluno</Text>
      </TouchableOpacity>

      <FlatList
        data={students}
        keyExtractor={item => String(item.id)}
        style={{ marginTop: 20 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.nome}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('EditStudent', { id: item.id })}>
                <Ionicons name="create-outline" size={22} color="#85B4D1" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Ionicons name="trash-outline" size={22} color="#D9ACB5" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F5F0EB' },
  addButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#EDC28A', paddingVertical: 12, borderRadius: 10 },
  addButtonText: { color: '#fff', fontSize: 15, fontWeight: '600' },
  card: { padding: 15, borderWidth: 1, borderColor: '#E8E1D9', marginBottom: 10, borderRadius: 10, backgroundColor: '#fff' },
  name: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#4A4A4A' },
  buttonContainer: { flexDirection: 'row', justifyContent: 'flex-end', gap: 24 }
});
