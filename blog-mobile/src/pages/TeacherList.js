import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useAuthGuard } from '../context/useAuthGuard';
import api from '../services/api';

export default function TeacherList({ navigation }) {
  useAuthGuard(navigation);
  const [teachers, setTeachers] = useState([]);

  useFocusEffect(
    useCallback(() => {
      fetchTeachers();
    }, [])
  );

  async function fetchTeachers() {
    try {
      const response = await api.get('/professores');
      setTeachers(response.data);
    } catch (error) {
      console.error("Erro ao buscar professores:", error);
    }
  }

  async function handleDelete(id) {
    try {
      await api.delete(`/professores/${id}`);
      Alert.alert('Sucesso', 'Professor removido com sucesso!');
      fetchTeachers(); 
    } catch (error) {
      console.error("Erro ao deletar:", error);
      Alert.alert('Erro', 'Não foi possível remover o professor.');
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('CreateTeacher')}>
        <Ionicons name="person-add-outline" size={20} color="#fff" />
        <Text style={styles.addButtonText}>Cadastrar Novo Professor</Text>
      </TouchableOpacity>
      
      <FlatList
        data={teachers}
        keyExtractor={item => String(item.id)}
        style={{ marginTop: 20 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity onPress={() => navigation.navigate('TeacherDetail', { teacher: item })}>
              <Text style={styles.name}>{item.nome}</Text>
              <Text style={styles.email}>{item.email}</Text>
            </TouchableOpacity>
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('EditTeacher', { id: item.id })}>
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
  addButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#94C19D', paddingVertical: 12, borderRadius: 10 },
  addButtonText: { color: '#fff', fontSize: 15, fontWeight: '600' },
  card: { padding: 15, borderWidth: 1, borderColor: '#E8E1D9', marginBottom: 10, borderRadius: 10, backgroundColor: '#fff' },
  name: { fontSize: 18, fontWeight: 'bold', marginBottom: 3, color: '#4A4A4A' },
  email: { fontSize: 14, color: '#8B8B8B', marginBottom: 12 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'flex-end', gap: 24 }
});
