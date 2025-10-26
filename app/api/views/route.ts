import { kv } from '@vercel/kv'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

async function getPptId(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const pptId = searchParams.get('ppt')
  return pptId
}

async function handleGet(pptId: string) {
  const key = `ppt:view:${pptId}`
  const count = await kv.get<number>(key)
  return NextResponse.json({
    pptId,
    count: typeof count === 'number' ? count : 0,
  })
}

async function handlePost(request: NextRequest, pptId: string) {
  let body = null
  try {
    body = await request.json()
  } catch (error) {
    // ignore malformed JSON, fallback to increment
  }

  const key = `ppt:view:${pptId}`
  const count = await kv.incr(key)
  const source =
    body && typeof body === 'object' ? body.source || body.event || null : null

  return NextResponse.json({ pptId, count, source })
}

export async function GET(request: NextRequest) {
  const pptId = await getPptId(request)
  if (!pptId) {
    return NextResponse.json({ error: 'Missing ppt parameter' }, { status: 400 })
  }

  try {
    return await handleGet(pptId)
  } catch (error) {
    console.error('KV handler error', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const pptId = await getPptId(request)
  if (!pptId) {
    return NextResponse.json({ error: 'Missing ppt parameter' }, { status: 400 })
  }

  try {
    return await handlePost(request, pptId)
  } catch (error) {
    console.error('KV handler error', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
