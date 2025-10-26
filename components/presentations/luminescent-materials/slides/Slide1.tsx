export default function Slide1() {
  return (
    <section
      data-background-image="/images/bj.jpg"
      data-background-size="cover"
      data-background-position="center center"
    >
      <div className="relative h-full flex flex-col items-center justify-center">
        <span className="select-none bg-gradient-to-b from-white to-slate-900/10 bg-clip-text text-7xl font-semibold leading-none text-transparent absolute -top-28">
          新能源光织物的开发及其在主动光安全系统中的应用
        </span>
        
        <div className="absolute top-60 right-28 flex flex-row items-center justify-end gap-4 text-4xl text-blue-300">
          <div className="flex flex-row items-center">
            <span className="px-2 py-1 rounded">
              <i className="mdi mdi-school mx-2"></i>
              扬州大学
            </span>
          </div>
          <div className="flex flex-row items-center">
            <span className="px-2 py-1 rounded">
              <i className="mdi mdi-account mx-2"></i>
              田甜
            </span>
          </div>
          <div className="flex flex-row items-center">
            <i className="mdi mdi-email mx-2"></i>
            <a href="mailto:tiant91@yzu.edu.cn" className="text-blue-300">
              tiant91@yzu.edu.cn
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
