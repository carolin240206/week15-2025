import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{ id: string }>;
};

// GET: Mengambil detail artikel
export async function GET(
  request: Request,
  { params }: Props
) {
  try {
    const { id } = await params;

    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
    });

    if (!post) {
      return NextResponse.json(
        { message: "Artikel tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch {
    return NextResponse.json(
      { message: "Gagal mengambil artikel" },
      { status: 500 }
    );
  }
}

// PUT: Memperbarui artikel
export async function PUT(
  request: Request,
  { params }: Props
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, content } = body;

    if (!title || !content) {
      return NextResponse.json(
        { message: "Title dan content wajib diisi" },
        { status: 400 }
      );
    }

    const post = await prisma.post.update({
      where: { id: Number(id) },
      data: { title, content },
    });

    return NextResponse.json(post);
  } catch {
    return NextResponse.json(
      { message: "Gagal memperbarui artikel" },
      { status: 500 }
    );
  }
}

// DELETE: Menghapus artikel
export async function DELETE(
  request: Request,
  { params }: Props
) {
  try {
    const { id } = await params;

    await prisma.post.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({
      message: "Artikel berhasil dihapus",
    });
  } catch {
    return NextResponse.json(
      { message: "Gagal menghapus artikel" },
      { status: 500 }
    );
  }
}
