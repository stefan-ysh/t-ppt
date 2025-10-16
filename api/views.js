import { kv } from '@vercel/kv'

export const config = {
  runtime: 'edge',
}

async function getPptId(request) {
  const { searchParams } = new URL(request.url)
  const pptId = searchParams.get('ppt')
  return pptId
}

async function handleGet(pptId) {
  const key = `ppt:view:${pptId}`
  const count = await kv.get(key)
  return new Response(
    JSON.stringify({ pptId, count: typeof count === 'number' ? count : 0 }),
    {
      status: 200,
      headers: { 'content-type': 'application/json' },
    }
  )
}

async function handlePost(request, pptId) {
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

  return new Response(JSON.stringify({ pptId, count, source }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  })
}

export default async function handler(request) {
  if (request.method !== 'GET' && request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  const pptId = await getPptId(request)
  if (!pptId) {
    return new Response('Missing ppt parameter', { status: 400 })
  }

  try {
    if (request.method === 'GET') {
      return await handleGet(pptId)
    }
    return await handlePost(request, pptId)
  } catch (error) {
    console.error('KV handler error', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
