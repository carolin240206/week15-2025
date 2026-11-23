"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      "Apakah kamu yakin ingin menghapus artikel ini?"
    );

    if (!confirmed) return;

    setLoading(true);

    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Gagal menghapus artikel");
      }

      router.push("/");
      router.refresh();
    } catch {
      alert("Artikel gagal dihapus.");
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      style={{
        backgroundColor: "#dc2626",
        color: "white",
        padding: "10px 16px",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
      }}
    >
      {loading ? "Menghapus..." : "Hapus Artikel"}
    </button>
  );
}
