"use client";
import React, { useEffect, useState } from 'react';
import Layout from './layout';
import PostCard from './components/PostCard';
import { fetchPosts } from './api';

const REFRESH_INTERVAL = 60000;

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPosts = async () => {
    setLoading(true);
    const data = await fetchPosts();
    setPosts(data);
    setLoading(false);
  };

  useEffect(() => {
    loadPosts();
    const interval = setInterval(loadPosts, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      {loading ? <p className="loading">Loading feed...</p> : posts.map(post => <PostCard key={post.id} post={post} />)}
    </Layout>
  );
};

export default HomePage;
