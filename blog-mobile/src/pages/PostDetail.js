import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import api from '../services/api';

export default function PostDetail({ route, navigation }) {
  const { id } = route.params; 
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await api.get(`/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error("Erro ao buscar o post:", error);
      }
    }
    fetchPost();
  }, [id]);

  if (!post) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.author}>Autor: {post.author}</Text>
      <Text style={styles.content}>{post.content}</Text>
      
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('EditPost', { id: post.id })}
      >
        <Text style={styles.editButtonText}>Editar Postagem</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F5F0EB' },
  title: { fontWeight: 'bold', fontSize: 24, marginBottom: 10, color: '#4A4A4A' },
  author: { fontStyle: 'italic', color: '#8B8B8B', marginBottom: 20 },
  content: { fontSize: 16, lineHeight: 26, color: '#555' },
  editButton: {
    marginTop: 30,
    backgroundColor: '#85B4D1',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
