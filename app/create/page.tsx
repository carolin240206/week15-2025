"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CreatePost() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        throw new Error("Gagal menambahkan artikel");
      }

      router.push("/");
      router.refresh();
    } catch (err) {
      setError("Artikel gagal disimpan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: "700px", margin: "50px auto", padding: "20px" }}>
      <h1>Create Post</h1>
      <p>Tambahkan artikel baru ke blog kamu.</p>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <label>Judul Artikel</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Masukkan judul artikel"
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
            placeholder="Tuliskan isi artikel..."
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

        <button
          type="submit"
          disabled={loading}
          style={{
            backgroundColor: "#2563eb",
            color: "white",
            padding: "12px 20px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          {loading ? "Menyimpan..." : "Simpan Artikel"}
        </button>

        {" "}
        <Link href="/">Kembali</Link>
      </form>
    </main>
  );
}
