"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function EditPost() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getPost() {
      try {
        const response = await fetch(`/api/posts/${id}`);

        if (!response.ok) {
          throw new Error("Artikel tidak ditemukan");
        }

        const post = await response.json();
        setTitle(post.title);
        setContent(post.content);
      } catch {
        setError("Gagal mengambil data artikel.");
      } finally {
        setLoading(false);
      }
    }

    getPost();
  }, [id]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        throw new Error("Gagal memperbarui artikel");
      }

      router.push(`/post/${id}`);
      router.refresh();
    } catch {
      setError("Artikel gagal diperbarui.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p>Memuat artikel...</p>;

  return (
    <main style={{ maxWidth: "700px", margin: "50px auto", padding: "20px" }}>
      <h1>Edit Post</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <label>Judul Artikel</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{
              display: "block",
              width: "100%",
              padding: "12px",
              marginTop: "8px",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Isi Artikel</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={8}
            style={{
              display: "block",
              width: "100%",
              padding: "12px",
              marginTop: "8px",
              boxSizing: "border-box",
            }}
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" disabled={saving}>
          {saving ? "Menyimpan..." : "Update Artikel"}
        </button>

        {" "}
        <Link href={`/post/${id}`}>Batal</Link>
      </form>
    </main>
  );
}
