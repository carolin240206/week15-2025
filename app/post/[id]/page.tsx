import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import DeleteButton from "./delete-button";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PostDetail({ params }: Props) {
  const { id } = await params;

  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
  });

  if (!post) notFound();

  return (
    <main
      style={{
        maxWidth: "800px",
        margin: "50px auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <Link href="/">← Kembali ke Blog</Link>

      <article
        style={{
          marginTop: "30px",
          padding: "25px",
          border: "1px solid #ddd",
          borderRadius: "10px",
        }}
      >
        <h1>{post.title}</h1>

        <p style={{ color: "gray" }}>
          Dipublikasikan pada{" "}
          {new Date(post.createdAt).toLocaleDateString("id-ID")}
        </p>

        <hr />

        <p style={{ whiteSpace: "pre-wrap", lineHeight: "1.8" }}>
          {post.content}
        </p>

        <div style={{ display: "flex", gap: "10px", marginTop: "25px" }}>
          <Link
            href={`/post/${id}/edit`}
            style={{
              backgroundColor: "#2563eb",
              color: "white",
              padding: "10px 16px",
              borderRadius: "6px",
              textDecoration: "none",
            }}
          >
            Edit Artikel
          </Link>

          <DeleteButton id={id} />
        </div>
      </article>
    </main>
  );
}
