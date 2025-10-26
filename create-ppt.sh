#!/bin/bash

# 快速添加新演示文稿的脚本

echo "🎨 创建新演示文稿向导"
echo "===================="
echo ""

# 获取用户输入
read -p "演示文稿 ID (英文, 用 - 连接): " PPT_ID
read -p "演示文稿标题: " PPT_TITLE
read -p "演示文稿副标题: " PPT_SUBTITLE
read -p "作者: " PPT_AUTHOR
read -p "单位/部门: " PPT_DEPT

echo ""
echo "📝 正在创建演示文稿..."

# 生成组件名 (kebab-case -> PascalCase)
PPT_COMPONENT=$(echo "$PPT_ID" | awk -F- '{for(i=1;i<=NF;i++){printf toupper(substr($i,1,1)) substr($i,2)}}')

# 创建目录结构
mkdir -p "components/presentations/${PPT_ID}/slides"

# 创建 index.tsx
cat > "components/presentations/${PPT_ID}/index.tsx" << EOF
import Slide1 from "./slides/Slide1";
import Slide2 from "./slides/Slide2";
import Slide3 from "./slides/Slide3";

export default function ${PPT_COMPONENT}Slides() {
  return (
    <>
      <Slide1 />
      <Slide2 />
      <Slide3 />
    </>
  );
}
EOF

# 创建幻灯片模板
cat > "components/presentations/${PPT_ID}/slides/Slide1.tsx" << EOF
export default function Slide1() {
  return (
    <section data-background="#1a202c">
      <h1 className="text-6xl font-bold text-white mb-8">
        ${PPT_TITLE}
      </h1>
      <p className="text-2xl text-gray-300">${PPT_SUBTITLE}</p>
      <div className="mt-12 text-lg text-gray-400">
        <p>${PPT_AUTHOR}</p>
        <p>${PPT_DEPT}</p>
      </div>
    </section>
  );
}
EOF

cat > "components/presentations/${PPT_ID}/slides/Slide2.tsx" << 'EOF'
export default function Slide2() {
  return (
    <section data-background="#2d3748">
      <h2 className="text-4xl font-bold text-white mb-6">第二页</h2>
      <p className="text-xl text-gray-300">
        在这里添加你的内容...
      </p>
    </section>
  );
}
EOF

cat > "components/presentations/${PPT_ID}/slides/Slide3.tsx" << 'EOF'
export default function Slide3() {
  return (
    <section data-background="#111827">
      <h2 className="text-5xl font-bold text-white mb-8">谢谢观看！</h2>
      <p className="text-xl text-gray-400">
        在这里总结本次演示的关键点。
      </p>
    </section>
  );
}
EOF

# 创建顶层 re-export 文件
cat > "components/presentations/${PPT_ID}.tsx" << EOF
export { default } from "./${PPT_ID}/index";
EOF

echo "✅ 创建了 components/presentations/${PPT_ID}/ 结构"
echo ""
echo "📋 接下来需要手动完成以下步骤："
echo ""
echo "1. 在 app/page.tsx 的 presentations 数组中添加："
echo ""
echo "  {"
echo "    id: '${PPT_ID}',"
echo "    title: '${PPT_TITLE}',"
echo "    subtitle: '${PPT_SUBTITLE}',"
echo "    author: '${PPT_AUTHOR}',"
echo "    department: '${PPT_DEPT}',"
echo "    thumbnail: '/images/your-thumbnail.jpg',"
echo "    date: '2024年',"
echo "    slides: 3,"
echo "  },"
echo ""
echo "2. 在 app/presentation/[id]/page.tsx 的 presentations 对象中添加:"
echo ""
echo "  '${PPT_ID}': {"
echo "    title: '${PPT_TITLE}',"
echo "    slides: '${PPT_ID}',"
echo "  },"
echo ""
echo "3. 在 components/PresentationWrapper.tsx 中:"
echo "   - 导入: import ${PPT_COMPONENT}Slides from './presentations/${PPT_ID}'"
echo "   - 在 renderSlides() 添加 case '${PPT_ID}': return <${PPT_COMPONENT}Slides />"
echo ""
echo "4. 添加缩略图到 public/images/"
echo ""
echo "🎉 完成后即可在首页看到新的演示文稿！"
