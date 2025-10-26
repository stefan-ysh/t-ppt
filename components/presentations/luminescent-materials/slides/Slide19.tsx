export default function Slide19() {
  return (
    <section data-background="#000000" className="!inset-0">
      <div className="relative h-full w-full grid-cols-12 gap-6 px-12 py-16">
        <video
          data-autoplay
          className=" absolute left-0 w-full -top-2 object-cover"
          src="/images/19-1.mp4"
          muted
          loop
          playsInline
          controls={false}
        />
        <img
          src="/images/19-3.png"
          alt="光织材料辅助汽车安全预警"
          className="absolute right-0 top-0 h-2/5 !z-11 object-contain"
        />
        <video
          className="h-64 absolute right-0 bottom-32 object-cover shadow-xl"
          src="/images/19-2.mp4"
          data-autoplay
          muted
          loop
          playsInline
          controls={false}
        />
        <div className="absolute w-full bottom-14 px-32 text-xl flex justify-between ">
          <p>光织物照明下辅助行驶，提高低可视条件下的提示能力</p>
          <p>纤维膜经受揉搓仍能保持发光，实现耐久的动态警示</p>
        </div>
      </div>
    </section>
  );
}
