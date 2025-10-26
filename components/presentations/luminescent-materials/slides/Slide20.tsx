import { Compare } from "@/components/ui/compare";
export default function Slide20() {
  return (
    <section data-background="#030712" className="!inset-0">
      {/* <div className="flex h-full w-full items-center justify-center gap-16 px-12 py-16 text-white">
        <figure className="flex flex-col items-center gap-4">
          <img
            src="/images/before.png"
            alt="方案优化前"
            className="h-[460px] w-[640px] rounded-3xl object-cover shadow-2xl"
          />
          <figcaption className="text-sm text-slate-300">替换前：传统材料在低光环境中识别度有限</figcaption>
        </figure>
        <figure className="flex flex-col items-center gap-4">
          <img
            src="/images/after.jpg"
            alt="方案优化后"
            className="h-[460px] w-[640px] rounded-3xl object-cover shadow-2xl"
          />
          <figcaption className="text-sm text-emerald-200">替换后：发光织物实现高可视度信息显示</figcaption>
        </figure>
      </div> */}
      {/* <div className="p-4 border rounded-3xl dark:bg-neutral-900 bg-neutral-100  border-neutral-200 dark:border-neutral-800 px-4"> */}
      <div className="flex items-center justify-center absolute inset-0">
        <Compare
          firstImage="/images/before.png"
          secondImage="/images/after.jpg"
          autoplay
          autoplayDuration={9000}
          firstImageClassName="object-cover object-left-top overflow-hidden "
          secondImageClassname="object-cover object-left-top overflow-hidden"
          className="h-[400px] w-[850px] sm:h-[500px] sm:w-[650px] mx-auto"
        />
      </div>
      {/* </div> */}
    </section>
  );
}
