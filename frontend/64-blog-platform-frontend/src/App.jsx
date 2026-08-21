import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = "http://localhost:9898/api/posts";

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  const fetchPosts = async () => {
    try {
      const res = await axios.get(API_URL);
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchPosts(); }, []);

  const addPost = async () => {
    if (!title.trim() || !content.trim()) return alert("Enter title and content");
    await axios.post(API_URL, { title, content, author });
    setTitle(""); setContent(""); setAuthor("");
    fetchPosts();
  };

  const deletePost = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchPosts();
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", padding: 20, fontFamily: "Segoe UI, sans-serif" }}>
      <div style={{ maxWidth: 700, margin: "0 auto", background: "white", borderRadius: 16, padding: 30, boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>

        <h1 style={{ textAlign: "center", margin: "0 0 5px 0", color: "#333", fontSize: 32 }}>📝 Blog Platform</h1>
        <p style={{ textAlign: "center", color: "#666", marginBottom: 25 }}>Spring Boot + Oracle 11g + React | by Ravi Teja</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 30, background: "#f8f9fa", padding: 15, borderRadius: 12 }}>
          <input
            placeholder="Post Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            style={{ padding: "12px 15px", borderRadius: 8, border: "1px solid #ddd", outline: "none", fontSize: 14 }}
          />
          <textarea
            placeholder="Write your post content..."
            value={content}
            onChange={e => setContent(e.target.value)}
            rows={4}
            style={{ padding: "12px 15px", borderRadius: 8, border: "1px solid #ddd", outline: "none", fontSize: 14, resize: "vertical" }}
          />
          <input
            placeholder="Author name"
            value={author}
            onChange={e => setAuthor(e.target.value)}
            style={{ padding: "12px 15px", borderRadius: 8, border: "1px solid #ddd", outline: "none", fontSize: 14 }}
          />
          <button onClick={addPost} style={{ padding: "12px 20px", background: "#667eea", color: "white", border: "none", borderRadius: 8, fontWeight: "bold", cursor: "pointer" }}>+ Publish Post</button>
        </div>

        <div>
          <h3 style={{ color: "#333" }}>All Posts ({posts.length})</h3>
          {posts.length === 0 && <p style={{ textAlign: "center", color: "#999", padding: 20 }}>No posts yet. Write one above! 👆</p>}

          {posts.map(post => (
            <div key={post.id} style={{
              border: "1px solid #eee",
              padding: "15px 18px",
              marginBottom: 12,
              borderRadius: 10,
              background: "white"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: "bold", fontSize: 18, color: "#333" }}>{post.title}</div>
                  <div style={{ color: "#666", fontSize: 14, marginTop: 6 }}>{post.content}</div>
                  <div style={{ color: "#aaa", fontSize: 12, marginTop: 8 }}>
                    ✍️ {post.author || "Unknown"} | {new Date(post.createdAt).toLocaleString()}
                  </div>
                </div>
                <button onClick={() => deletePost(post.id)} style={{ padding: "7px 14px", background: "#f44336", color: "white", border: "none", borderRadius: 6, cursor: "pointer", marginLeft: 10 }}>Delete</button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 30, color: "#aaa", fontSize: 12 }}>
          Backend: http://localhost:9898/api/posts | Frontend: http://localhost:5173
        </div>
      </div>
    </div>
  );
}

export default App;