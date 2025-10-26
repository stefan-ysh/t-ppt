import { Highlighter } from "@/components/ui/highlighter";
import Image from "next/image";
export default function Slide4() {
  return (
    <section data-background="#030712" className="!inset-0">
      <div className="relative flex h-full w-full text-white">
        {/* 左侧背景图与说明 */}
        <div className="relative flex w-1/2">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/70 via-indigo-800/20 to-transparent" />

          <Image
            width="1000"
            src="/images/3-1.jpg"
            alt="主动安全技术示意"
            height="600"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />

          <h4 className="absolute left-0 top-0 z-20 w-full bg-slate-900/80 px-6 py-4 text-3xl font-semibold tracking-wide text-left">
            研究背景
          </h4>

          <p className="absolute bottom-0 left-0 z-20 w-full bg-slate-900/70 px-2 py-5 text-xl text-slate-100 text-left">
            主动安全技术通过预判风险并辅助驾驶员在舒适状态下处置突发情况，帮助降低交通事故的发生概率
          </p>
        </div>

        {/* 右侧背景图与重点信息 */}
        <div className="relative flex w-1/2 items-center justify-end">
          <Image
            src="/images/3-2.jpg"
            alt="主动光安全系统"
            className="h-full w-full object-cover"
            width="1000"
          height="600"
          />
          <span className="absolute top-5 left-0 pl-5">
            什么是主动光安全系统？
          </span>

          <div className="absolute inset-y-0 right-0 w-full inset-0 bg-gradient-to-r from-indigo-900/60 via-indigo-900/10 to-transparent" />
          {/* 什么是主动光安全系统？ */}
          <div className="absolute right-8 top-20 z-20 space-y-4 text-left pl-5">
            <p className="text-xl  text-slate-200">
              集成光学材料、智能传感与响应控制的先进安全系统，通过
              <Highlighter action="underline" color="#FF9800">
                主动发光·动态提示·环境交互
              </Highlighter>
              等方式增强人、车、环境的可视化与通信能力，从而实现事故预防与安全性能提升。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
