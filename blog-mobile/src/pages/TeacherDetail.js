import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function TeacherDetail({ route, navigation }) {
  const { teacher } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Nome</Text>
        <Text style={styles.value}>{teacher.nome}</Text>

        <Text style={styles.label}>E-mail</Text>
        <Text style={styles.value}>{teacher.email}</Text>
      </View>

      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
        <Text style={styles.closeButtonText}>Fechar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F5F0EB' },
  card: { padding: 20, borderWidth: 1, borderColor: '#E8E1D9', borderRadius: 12, backgroundColor: '#fff', marginTop: 10 },
  label: { fontSize: 13, fontWeight: '600', color: '#8B8B8B', marginTop: 12, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 },
  value: { fontSize: 18, color: '#4A4A4A', marginBottom: 4 },
  closeButton: { backgroundColor: '#B5BEC6', paddingVertical: 14, borderRadius: 10, alignItems: 'center', marginTop: 30 },
  closeButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
