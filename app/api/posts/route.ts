import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: Mengambil semua data post
export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { message: "Gagal mengambil data post" },
      { status: 500 }
    );
  }
}

// POST: Menambahkan post baru
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content } = body;

    if (!title || !content) {
      return NextResponse.json(
        { message: "Title dan content wajib diisi" },
        { status: 400 }
      );
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Gagal membuat post" },
      { status: 500 }
    );
  }
}
