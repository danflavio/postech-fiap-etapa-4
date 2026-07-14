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
        style={styles.closeButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.closeButtonText}>Fechar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F5F0EB' },
  title: { fontWeight: 'bold', fontSize: 24, marginBottom: 10, color: '#4A4A4A' },
  author: { fontStyle: 'italic', color: '#8B8B8B', marginBottom: 20 },
  content: { fontSize: 16, lineHeight: 26, color: '#555' },
  closeButton: {
    marginTop: 30,
    backgroundColor: '#B5BEC6',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
