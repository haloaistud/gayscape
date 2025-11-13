"use client";
import React, { useState, useEffect } from "react";

interface Comment {
  id: number;
  user: string;
  content: string;
  timestamp: Date;
}

interface Post {
  id: number;
  user: string;
  avatar: string;
  content: string;
  likes: number;
  timestamp: Date;
  comments: Comment[];
  color: string;
}

const userColors: string[] = ["#FF6B6B", "#4ECDC4", "#FFD93D", "#6A4C93", "#FF9F1C"];

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState("");
  const [loadedCount, setLoadedCount] = useState(5); // For infinite scroll simulation

  // Initialize with sample posts
  useEffect(() => {
    const initialPosts: Post[] = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      user: `User${i + 1}`,
      avatar: `https://i.pravatar.cc/40?img=${i + 1}`,
      content: `Sample post content #${i + 1}`,
      likes: Math.floor(Math.random() * 10),
      timestamp: new Date(Date.now() - i * 60000),
      comments: [],
      color: userColors[i % userColors.length],
    }));
    setPosts(initialPosts);
  }, []);

  const addPost = () => {
    if (!newPost.trim()) return;
    const post: Post = {
      id: posts.length + 1,
      user: "You",
      avatar: "https://i.pravatar.cc/40?img=99",
      content: newPost,
      likes: 0,
      timestamp: new Date(),
      comments: [],
      color: userColors[Math.floor(Math.random() * userColors.length)],
    };
    setPosts([post, ...posts]);
    setNewPost("");
  };

  const editPost = (id: number, content: string) => {
    setPosts(posts.map(p => p.id === id ? { ...p, content } : p));
  };

  const deletePost = (id: number) => {
    setPosts(posts.filter(p => p.id !== id));
  };

  const likePost = (id: number) => {
    setPosts(posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  const addComment = (postId: number, content: string) => {
    if (!content.trim()) return;
    setPosts(posts.map(p => {
      if (p.id === postId) {
        const comment: Comment = {
          id: p.comments.length + 1,
          user: "You",
          content,
          timestamp: new Date(),
        };
        return { ...p, comments: [...p.comments, comment] };
      }
      return p;
    }));
  };

  const formatDate = (date: Date) =>
    `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;

  // Simulate infinite scroll
  const loadMore = () => setLoadedCount(prev => Math.min(prev + 5, posts.length));

  return (
    <main style={{ maxWidth: "600px", margin: "2rem auto", fontFamily: "Arial, sans-serif" }}>
      <header style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "0.25rem" }}>Production Social Feed</h1>
        <p style={{ color: "#555" }}>Dynamic, editable posts with likes and comments!</p>
      </header>

      {/* New Post */}
      <section style={{ marginBottom: "2rem" }}>
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="What's on your mind?"
          style={{
            width: "100%",
            padding: "0.75rem",
            borderRadius: "10px",
            border: "1px solid #ccc",
            resize: "none",
            fontSize: "1rem",
          }}
          rows={3}
        />
        <button
          onClick={addPost}
          style={{
            marginTop: "0.5rem",
            padding: "0.5rem 1.25rem",
            borderRadius: "10px",
            border: "none",
            backgroundColor: "#0070f3",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "bold",
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#005bb5")}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#0070f3")}
        >
          Post
        </button>
      </section>

      {/* Post Feed */}
      <section style={{ maxHeight: "75vh", overflowY: "auto" }}>
        {posts.slice(0, loadedCount).map(post => (
          <PostCard
            key={post.id}
            post={post}
            likePost={likePost}
            addComment={addComment}
            editPost={editPost}
            deletePost={deletePost}
            formatDate={formatDate}
          />
        ))}
        {loadedCount < posts.length && (
          <button
            onClick={loadMore}
            style={{
              width: "100%",
              padding: "0.5rem",
              marginTop: "0.5rem",
              borderRadius: "8px",
              border: "1px solid #0070f3",
              backgroundColor: "#fff",
              color: "#0070f3",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#0070f3"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#fff"; e.currentTarget.style.color = "#0070f3"; }}
          >
            Load More
          </button>
        )}
      </section>
    </main>
  );
}

// Post Card Component
function PostCard({
  post,
  likePost,
  addComment,
  editPost,
  deletePost,
  formatDate,
}: {
  post: Post;
  likePost: (id: number) => void;
  addComment: (postId: number, content: string) => void;
  editPost: (id: number, content: string) => void;
  deletePost: (id: number) => void;
  formatDate: (date: Date) => string;
}) {
  const [editing, setEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.content);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        border: `2px solid ${post.color}`,
        borderRadius: "12px",
        padding: "1rem",
        marginBottom: "1rem",
        backgroundColor: "#fff",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem" }}>
        <img src={post.avatar} alt={post.user} style={{ width: "40px", height: "40px", borderRadius: "50%", marginRight: "0.75rem" }} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <strong>{post.user}</strong>
          <span style={{ fontSize: "0.8rem", color: "#777" }}>{formatDate(post.timestamp)}</span>
        </div>
      </div>

      {editing ? (
        <div style={{ marginBottom: "0.5rem" }}>
          <textarea
            value={editContent}
            onChange={e => setEditContent(e.target.value)}
            style={{ width: "100%", borderRadius: "8px", padding: "0.5rem", fontSize: "0.95rem" }}
            rows={2}
          />
          <div style={{ marginTop: "0.25rem" }}>
            <button onClick={() => { editPost(post.id, editContent); setEditing(false); }} style={{ marginRight: "0.5rem", cursor: "pointer" }}>Save</button>
            <button onClick={() => { setEditing(false); setEditContent(post.content); }} style={{ cursor: "pointer" }}>Cancel</button>
          </div>
        </div>
      ) : (
        <p style={{ marginBottom: "0.5rem", fontSize: "1rem" }}>{post.content}</p>
      )}

      <div style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem" }}>
        <button
          onClick={() => likePost(post.id)}
          style={{
            padding: "0.3rem 0.6rem",
            borderRadius: "6px",
            border: `1px solid ${post.color}`,
            backgroundColor: "#fff",
            color: post.color,
            cursor: "pointer",
            fontSize: "0.9rem",
            fontWeight: "bold",
            marginRight: "0.5rem",
          }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = post.color; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#fff"; e.currentTarget.style.color = post.color; }}
        >
          👍 {post.likes} Like
        </button>
        <button onClick={() => setEditing(true)} style={{ cursor: "pointer", marginRight: "0.5rem" }}>Edit</button>
        <button onClick={() => deletePost(post.id)} style={{ cursor: "pointer" }}>Delete</button>
      </div>

      {/* Comments */}
      <div style={{ marginTop: "0.5rem" }}>
        {post.comments.map(c => (
          <div key={c.id} style={{ borderTop: "1px solid #eee", paddingTop: "0.5rem", paddingBottom: "0.5rem", marginBottom: "0.25rem", fontSize: "0.9rem" }}>
            <strong>{c.user}</strong> <span style={{ color: "#777", fontSize: "0.8rem" }}>{formatDate(c.timestamp)}</span>
            <p style={{ margin: "0.25rem 0" }}>{c.content}</p>
          </div>
        ))}
        <CommentInput postId={post.id} addComment={addComment} />
      </div>
    </div>
  );
}

// Comment input
function CommentInput({ postId, addComment }: { postId: number; addComment: (postId: number, content: string) => void }) {
  const [comment, setComment] = useState("");
  return (
    <div style={{ display: "flex", marginTop: "0.5rem" }}>
      <input
        type="text"
        placeholder="Write a comment..."
        value={comment}
        onChange={e => setComment(e.target.value)}
        style={{ flex: 1, padding: "0.5rem", borderRadius: "8px", border: "1px solid #ccc", fontSize: "0.9rem" }}
      />
      <button
        onClick={() => { addComment(postId, comment); setComment(""); }}
        style={{
          marginLeft: "0.5rem",
          padding: "0.4rem 0.8rem",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#0070f3",
          color: "#fff",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Comment
      </button>
    </div>
  );
}
