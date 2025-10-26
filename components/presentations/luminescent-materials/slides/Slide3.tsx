import Image from "next/image";
export default function Slide3() {
  return (
    <section data-background="#030712">
      <div className="flex flex-row  items-start">
        {/* 左侧：研究方向说明 */}
        <div className="w-1/2 flex flex-col justify-center pl-10">
          <h3 className="text-3xl mb-8 font-bold text-white text-left absolute -top-32">
            研究方向
          </h3>

          <div className="mb-32 text-left">
            <h5 className="mb-2 font-bold text-2xl text-white">
              1. 源材料合成
            </h5>
            <p className="text-2xl text-gray-300 leading-relaxed">
              聚焦于先进能源材料的合成方法与生长机制，构建智能化材料研发体系，以加速新材料的发现与优化
            </p>
          </div>

          <div className="mb-4 text-left">
            <h5 className="mb-2 font-bold text-2xl text-white">2. 光电转化</h5>
            <p className="text-2xl text-gray-300 leading-relaxed">
              构建从&nbsp;&quot;材料合成-器件集成-系统验证&quot;&nbsp;的一站式研发平台，旨在实现兼具高效稳定、多能互补与轻质柔性等特点的先进光电系统，聚焦能源材料智能化合成、高效光电转化器件开发与电化学储能体系核心技术的研究，推动地区产业化布局、经济发展，服务国家能源转型战略目标
            </p>
          </div>
        </div>

        {/* 右侧：饼状图 */}
        <div className="w-full flex flex-col items-start justify-center ml-20 pr-5">
          {/* 顶部标题 */}
          <h5 className=" text-white text-left text-2xl">
            科研团队近三年来发表论文 80 篇，主流期刊 11 篇，分布如下：
          </h5>
          <Image
            src="/images/chart.png"
            alt="论文分布饼状图"
            className="object-contain"
            width={1200}
            height={100}
          />
        </div>
      </div>
    </section>
  );
}
