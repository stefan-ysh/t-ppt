import { notFound } from 'next/navigation'
import PresentationWrapper from '../../../components/PresentationWrapper'
import { presentationMap } from '../../../components/presentations/registry'

export default function PresentationPage({ params }: { params: { id: string } }) {
  if (!presentationMap[params.id]) {
    notFound()
  }

  return <PresentationWrapper presentationId={params.id} />
}

// 生成静态参数（用于静态导出和预渲染）
export async function generateStaticParams() {
  return Object.keys(presentationMap).map((id) => ({
    id,
  }))
}

// 强制静态渲染
export const dynamic = 'force-static'
export const dynamicParams = false
