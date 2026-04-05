import { auth } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const resolvedParams = await params;
  return handleProxy(req, resolvedParams.path);
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const resolvedParams = await params;
  return handleProxy(req, resolvedParams.path);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const resolvedParams = await params;
  return handleProxy(req, resolvedParams.path);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const resolvedParams = await params;
  return handleProxy(req, resolvedParams.path);
}

async function handleProxy(req: NextRequest, path: string[]) {
  const session = await auth();
  const backendUrl = process.env.HOST_API_URL || 'http://localhost:3001';
  const fullPath = path.join('/');
  const query = req.nextUrl.search;

  const headers = new Headers(req.headers);
  headers.set('Host', new URL(backendUrl).host);
  if (session?.user) {
    // @ts-ignore
    headers.set('x-user-id', session.user.id || '');
    // @ts-ignore
    headers.set('x-user-role', session.user.role || 'USER');
  }

  try {
    const response = await fetch(`${backendUrl}/api/${fullPath}${query}`, {
      method: req.method,
      headers,
      body: req.method !== 'GET' ? await req.text() : undefined,
      cache: 'no-store',
    });

    const data = await response.text();
    return new NextResponse(data, {
      status: response.status,
      headers: { 'Content-Type': response.headers.get('Content-Type') || 'application/json' },
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json({ error: 'Backend connection failed' }, { status: 502 });
  }
}
