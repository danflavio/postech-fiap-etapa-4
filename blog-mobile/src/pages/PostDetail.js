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
  container: { flex: 1, padding: 20 },
  title: { fontWeight: 'bold', fontSize: 24, marginBottom: 10 },
  author: { fontStyle: 'italic', color: 'gray', marginBottom: 20 },
  content: { fontSize: 16, lineHeight: 24 },
  editButton: {
    marginTop: 30,
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});