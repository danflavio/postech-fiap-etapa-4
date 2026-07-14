import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import api from '../services/api';

export default function TeacherList({ navigation }) {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    fetchTeachers();
  }, []);

  // Busca a lista de professores na sua API
  async function fetchTeachers() {
    try {
      const response = await api.get('/professores');
      setTeachers(response.data);
    } catch (error) {
      console.error("Erro ao buscar professores:", error);
    }
  }

  // Deleta o professor e recarrega a lista
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
      <Button 
        title="Cadastrar Novo Professor" 
        onPress={() => navigation.navigate('CreateTeacher')} 
      />
      
      <FlatList
        data={teachers}
        keyExtractor={item => String(item.id)}
        style={{ marginTop: 20 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* Assumindo que sua API retorna um campo "nome" */}
            <Text style={styles.name}>{item.nome}</Text>
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('EditTeacher', { id: item.id })}>
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