import React, { useEffect, useState } from 'react';
import Layout from './layout';
import PostCard from './components/PostCard';
import { fetchPosts } from './api';

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const loadPosts = async () => {
      const data = await fetchPosts();
      setPosts(data);
    };
    loadPosts();
  }, []);

  return (
    <Layout>
      {posts.length ? (
        posts.map((post) => <PostCard key={post.id} post={post} />)
      ) : (
        <p>Loading posts...</p>
      )}
    </Layout>
  );
};

export default HomePage;
