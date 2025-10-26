export default function Slide15() {
  return (
    <>
      <section data-background="#030712" className="!inset-0" data-auto-animate data-transition="slide">
        <h3 className="text-3xl font-semibold !mt-5">长余辉光织物的光学表征</h3>
        <div
          data-id="mask-15"
          className="absolute bottom-10  w-full  h-[340px] bg-[#030712] !z-10"
          style={{ left: "0px" }}
        />
        <img
          src="/images/15-1.png"
          alt="长余辉光织物光学表征"
          className="object-cover !w-full absolute top-60 !z-11"
        />

        <div className="absolute left-10 bottom-10 flex">
          <img
            src="/images/15-2.png"
            alt="光谱测试"
            className="h-[300px] object-cover"
          />
          <img
            src="/images/15-3.png"
            alt="余辉性能曲线"
            className="backdrop-blur h-[350px] object-cover"
            data-preview-image="/images/15-2.png"
          />
        </div>
        <div className="absolute bottom-10 right-0 w-4/5 flex justify-center gap-48 text-xl p-5">
          <span> 超长余晖寿命 </span>
          <span> 具有全光谱余晖发射 </span>
          <span> 接受激发的光源波段范围广 </span>
          <span> 超长白色余晖 </span>
        </div>
      </section>
      <section data-background="#030712" className="!inset-0" data-auto-animate>
        <h3 className="text-3xl font-semibold !mt-5">长余辉光织物的光学表征</h3>
        <div
          data-id="mask-15"
          className="absolute bottom-10  w-full  h-[340px] bg-[#030712] !z-10"
          style={{ left: "100%" }}
        />
        <img
          src="/images/15-1.png"
          alt="长余辉光织物光学表征"
          className="object-cover !w-full absolute top-32 !z-11"
        />

        <div className="absolute left-10 bottom-10 flex">
          <img
            src="/images/15-2.png"
            alt="光谱测试"
            className="h-[300px] object-cover"
            data-preview-image="/images/15-2.png"
          />
          <img
            src="/images/15-3.png"
            alt="余辉性能曲线"
            className="backdrop-blur h-[350px] object-cover"
          />
        </div>
        <div className="absolute bottom-10 right-0 w-4/5 flex justify-center gap-48 text-xl p-5">
          <span> 超长余晖寿命 </span>
          <span> 具有全光谱余晖发射 </span>
          <span> 接受激发的光源波段范围广 </span>
          <span> 超长白色余晖 </span>
        </div>
      </section>
    </>
  );
}
