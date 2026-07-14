import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import api from '../services/api';

export default function PostDetail({ route }) {
  const { postId } = route.params;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await api.get(`/posts/${postId}`);
        setPost(response.data);
      } catch {
        setError('Não foi possível carregar o post.');
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [postId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#e94560" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  if (!post) return null;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.meta}>
        {post.author} | {new Date(post.created_at).toLocaleDateString('pt-BR')}
      </Text>
      <Text style={styles.content}>{post.content}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontWeight: 'bold', fontSize: 24, marginBottom: 8 },
  meta: { color: '#666', marginBottom: 20, fontSize: 14 },
  content: { fontSize: 16, lineHeight: 24 },
  error: { color: 'red', textAlign: 'center' },
});
