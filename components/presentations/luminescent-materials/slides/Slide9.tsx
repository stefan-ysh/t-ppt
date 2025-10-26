const detailImages = [
  {
    label: "a",
    src: "/images/a.jpg",
    caption: "CsPbBr₃",
  },
  {
    label: "b",
    src: "/images/b.jpg",
    caption: "CsPbBr₃@HPβCD",
  },
  {
    label: "c",
    src: "/images/c.jpg",
    caption: "纳米晶体界面",
  },
  {
    label: "d",
    src: "/images/d.jpg",
    caption: "CsPbBr₃@HPβCD/PFOS",
  },
];

export default function Slide9() {
  return (
    <section data-background="#121826" className="!inset-0">
      <div className="relative mx-auto flex h-full w-full flex-col gap-2 p-5 text-white">
        <h3 className="text-center text-4xl font-semibold tracking-wide">
          形貌表征
        </h3>

        <div className="grid flex-1 grid-cols-12 gap-4">
          <figure className="col-span-6 flex items-center justify-center ">
            <img
              src="/images/---.png"
              alt="CsPbBr₃ 系列样品宏观形貌"
              className="w-5/6  object-contain shadow-2xl"
            />
          </figure>

          <div className="col-span-6 grid grid-cols-2 gap-6">
            {detailImages.map((item) => (
              <figure
                key={item.label}
                className="relative flex flex-col items-start p-5 backdrop-blur"
              >
                <span className="absolute -left-4 top-5 text-5xl font-semibold text-white/80">
                  {item.label}
                </span>
                <img
                  src={item.src}
                  alt={`${item.caption} 形貌图`}
                  className="w-full  object-cover shadow-lg"
                />
                <figcaption className="w-full mt-4 text-lg text-white text-center absolute -bottom-5">
                  {item.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="flex w-full text-slate-200/85 absolute -left-[480px] top-32 transform -translate-x-1/2">
          {["CsPbBr₃", "CsPbBr₃@HPβCD", "CsPbBr₃@HPβCD/PFOS"].map((text, i) => (
            <div
              key={text}
              className="absolute w-full p-1 text-right uppercase tracking-wide text-white text-3xl"
              style={{
                top: 290 * i,
              }}
            >
              {text}
            </div>
          ))}
        </div>

        <p className="text-xl text-slate-200/80 text-center">
          环糊精在改善 CsPbBr₃ 晶体质量中的作用
        </p>
      </div>
    </section>
  );
}
