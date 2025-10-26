export default function Slide13() {
  return (
    <section data-background="#030712" className="!inset-0">
      <h3 className="text-3xl font-semibold !mt-5">
        室温空气中制备大面积超长余晖多色稀土薄膜
      </h3>
      <div className="grid h-full w-full grid-cols-12 gap-10 px-5 text-white">
        <div className="col-span-6 flex flex-col gap-6">
          <div className="overflow-hidden ">
            <img
              src="/images/13l.png"
              alt="稀土薄膜图示"
              className="w-full object-cover"
            />
          </div>
          <p className="text-xl text-slate-300/90 !m-0">
            余辉时间突破30小时，光致发光量子产率达68.8%
          </p>
        </div>

        <div className="relative col-span-6 flex flex-col items-center justify-start">
          <video
            className=" w-full  object-cover shadow-2xl"
            src="/images/13r.mp4"
            data-autoplay
            muted
            loop
            playsInline
            controls={false}
          />
          <p className="mt-6 w-full text-center text-xl text-slate-200/80">
            以通过精确调控红、绿、蓝三色稀土荧光粉与ZnS的空间分布与界面相互作用，成功制备出面积达0.4m×3m的超长余辉膜
          </p>
        </div>
      </div>
    </section>
  );
}
