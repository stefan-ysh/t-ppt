import { Highlighter } from "@/components/ui/highlighter";
import Image from "next/image";

export default function Slide5() {
  return (
    <section data-background="#030712" className="!inset-0">
      <div className="relative flex h-full w-full flex-row overflow-hidden text-white">
        <h5 className="absolute left-0 top-12 z-20 w-1/2 px-0 text-center text-4xl font-semibold tracking-wide">
          新能源光织物的研发意义
        </h5>

        <p className="absolute left-0 top-[300px] z-[12] w-1/2 px-12 text-3xl leading-[200px] text-slate-100 text-left">
          新能源光织物作为一种融合光电材料与纺织技术的新型功能材料，具备
          <Highlighter action="underline" color="#7dd3fc">
            柔性、轻质、高亮度及环境响应
          </Highlighter>
          等特点。通过自发光、动态提示与环境自适应能力，显著增强人、车、环境在低可视条件下的安全性，尤其适用于交通、救援、户外作业等领域。
        </p>

        <Image
          width="900"
          height="600"
          src="/images/4-2.png"
          alt="新能源光织物技术应用"
          className="absolute left-[555px] top-[275px] z-[12] w-[1240px] drop-shadow-[0_12px_30px_rgba(125,211,252,0.45)]"
        />

        <Image
          width="1000"
          height="700"
          src="/images/4-1.jpg"
          alt="新能源光织物实物展示"
          className="absolute right-0 top-0 h-full w-1/2 object-cover"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/45 to-transparent" />
      </div>
    </section>
  );
}
