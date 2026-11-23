import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main
      style={{
        maxWidth: "900px",
        margin: "50px auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "35px",
        }}
      >
        <h1>My Blog</h1>

        <Link
          href="/create"
          style={{
            backgroundColor: "#2563eb",
            color: "white",
            padding: "12px 18px",
            borderRadius: "8px",
            textDecoration: "none",
          }}
        >
          + Create Post
        </Link>
      </header>

      <h2>Daftar Artikel</h2>

      {posts.length === 0 ? (
        <p>Belum ada artikel. Silakan buat artikel pertama kamu!</p>
      ) : (
        <div>
          {posts.map((post) => (
            <article
              key={post.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "20px",
                marginBottom: "15px",
              }}
            >
              <h3>{post.title}</h3>

              <p>{post.content}</p>

              <small>
                {new Date(post.createdAt).toLocaleDateString("id-ID")}
              </small>

              <div style={{ marginTop: "15px" }}>
                <Link href={`/post/${post.id}`}>
                  Lihat Detail →
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
