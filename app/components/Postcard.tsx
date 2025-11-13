// app/components/PostCard.tsx
import React from 'react';

interface PostCardProps {
  title: string;
  content: string;
  author?: string;
  date?: string;
}

const PostCard: React.FC<PostCardProps> = ({ title, content, author, date }) => {
  return (
    <div className="post-card" style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '16px',
      backgroundColor: '#fff'
    }}>
      <h2 style={{ marginBottom: '8px' }}>{title}</h2>
      <p style={{ marginBottom: '12px' }}>{content}</p>
      {author && <small>By {author}</small>}
      {date && <small> • {date}</small>}
    </div>
  );
};

export default PostCard;
