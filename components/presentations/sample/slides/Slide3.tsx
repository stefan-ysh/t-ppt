export default function Slide3() {
  return (
    <section data-background="#1a202c">
      <h2 className="text-4xl font-bold text-white mb-6">第三页</h2>
      <div className="grid grid-cols-2 gap-8 text-left">
        <div className="bg-blue-900/50 p-6 rounded-lg">
          <h3 className="text-2xl font-bold text-blue-300 mb-4">特点 1</h3>
          <p className="text-gray-300">这里是特点 1 的详细描述</p>
        </div>
        <div className="bg-purple-900/50 p-6 rounded-lg">
          <h3 className="text-2xl font-bold text-purple-300 mb-4">特点 2</h3>
          <p className="text-gray-300">这里是特点 2 的详细描述</p>
        </div>
      </div>
    </section>
  );
}
