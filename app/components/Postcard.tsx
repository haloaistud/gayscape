"use client";
import React from 'react';
interface PostCardProps { post: { id: string; title: string; content: string; }; }
const PostCard: React.FC<PostCardProps> = ({ post }) => (
  <div className="post-card">
    <h2>{post.title}</h2>
    <p>{post.content}</p>
  </div>
);
export default PostCard;
