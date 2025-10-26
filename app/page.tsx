import Link from 'next/link'
import { presentations } from '@/components/presentations/registry'
import ViewCounter from '@/components/ViewCounter'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            演示文稿中心
          </h1>
          <p className="text-xl text-gray-400">
            选择一个演示文稿开始浏览
          </p>
        </div>

        {/* PPT 卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {presentations.map((ppt) => (
            <Link
              key={ppt.id}
              href={`/ppt/${ppt.id}`}
              className="group relative bg-gray-800 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              {/* 缩略图 */}
              <div className="relative h-48 overflow-hidden bg-gray-700">
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-300"
                  style={{
                    backgroundImage: `url(${ppt.thumbnail})`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                
                {/* 幻灯片数量标签 */}
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {ppt.slides} 页
                </div>
              </div>

              {/* 卡片内容 */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {ppt.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {ppt.subtitle}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <div>
                    <p className="font-semibold text-gray-300">{ppt.author}</p>
                    <p>{ppt.department}</p>
                  </div>
                  <div className="text-right">
                    <p>{ppt.date}</p>
                  </div>
                </div>

                {/* 浏览量统计 */}
                <div className="pt-3 border-t border-gray-700">
                  <ViewCounter pptId={ppt.id} increment={false} />
                </div>
              </div>

              {/* 悬停时显示的"查看"按钮 */}
              <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors duration-300 flex items-center justify-center">
                <span className="text-white font-semibold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  点击查看 →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* 底部统计信息 */}
        <div className="mt-16 text-center">
          <p className="text-gray-500">
            共 <span className="text-white font-bold">{presentations.length}</span> 个演示文稿
          </p>
        </div>
      </div>
    </main>
  )
}
