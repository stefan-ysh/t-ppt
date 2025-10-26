'use client'

import { useEffect, useState } from 'react'
import { Eye } from 'lucide-react'

interface ViewCounterProps {
  pptId: string
  increment?: boolean
}

export default function ViewCounter({ pptId, increment = false }: ViewCounterProps) {
  const [views, setViews] = useState<number>(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchViews = async () => {
      try {
        // 获取当前浏览量
        const getResponse = await fetch(`/api/views?ppt=${pptId}`)
        const getData = await getResponse.json()
        
        if (increment) {
          // 如果需要增加浏览量（PPT 详情页）
          const postResponse = await fetch(`/api/views?ppt=${pptId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ source: 'page-view' }),
          })
          const postData = await postResponse.json()
          setViews(postData.count || 0)
        } else {
          // 只显示浏览量（首页列表）
          setViews(getData.count || 0)
        }
      } catch (error) {
        console.error('Failed to fetch views:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchViews()
  }, [pptId, increment])

  if (loading) {
    return (
      <div className="flex items-center gap-1 text-gray-400">
        <Eye className="w-4 h-4" />
        <span className="text-sm">...</span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-1 text-gray-400">
      <Eye className="w-4 h-4" />
      <span className="text-sm">{views.toLocaleString()} 次浏览</span>
    </div>
  )
}
