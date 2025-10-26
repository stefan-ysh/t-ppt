type ImageItem = {
  src: string;
  alt: string;
  caption?: string;
};

const mosaicImages: ImageItem[] = [
  {
    src: "/images/11 拷贝.png",
    alt: "多色发光织物样本 1",
  },
  {
    src: "/images/22 拷贝.png",
    alt: "多色发光织物样本 2",
  },
  {
    src: "/images/33 拷贝.png",
    alt: "多色发光织物样本 3",
  },
];

const applicationImages: ImageItem[] = [
  {
    src: "/images/10-3.png",
    alt: "三种钙钛矿纤维制备的 WLED",
    caption: "三种钙钛矿纤维制备的 WLED",
  },
  {
    src: "/images/555 拷贝.png",
    alt: "CsPbBr3 图案化显示",
    caption: "CsPbBr3 用于图案化显示",
  },
];

export default function Slide10() {
  return (
    <section data-background="#030712" className="!inset-0">
      <div className="relative flex h-full w-full flex-col gap-10 px-12 py-16 text-white">
        <h3 className="text-center text-4xl font-semibold">
          防水发光纤维膜的应用
        </h3>

        <div className="grid flex-1 grid-cols-12 gap-10">
          <div className="relative col-span-5 flex flex-col items-center justify-center gap-8 ">
            <div
              className="pointer-events-none absolute left-[-40px] top-20 h-80 w-80 origin-center rotate-[306deg] rounded-full opacity-80"
              style={{
                background:
                  "radial-gradient(ellipse 70% 60% at 90% 10%, rgba(64, 191, 134, 0.55), rgba(64, 191, 134, 0) 80%)",
              }}
            />

            <div className="relative flex w-full flex-col items-center gap-5">
              <img
                src="/images/666 拷贝.png"
                alt="CsPbBr3 防水纺织品"
                className="w-4/5 rounded-3xl object-cover shadow-2xl"
              />
              <img
                src="/images/1111图片 1.png"
                alt="放大细节"
                className="w-4/5 rounded-3xl object-cover shadow-lg"
              />
            </div>

            <p className="text-xl text-slate-200/85">
              CsPbBr₃ 防水纺织品用于救生衣显示
            </p>
          </div>

          <div className="col-span-7 flex flex-col gap-8">
            <div className="relative ">
              <div className="grid grid-cols-3 gap-4">
                {mosaicImages.map((img) => (
                  <img
                    key={img.src}
                    src={img.src}
                    alt={img.alt}
                    className="mx-auto w-4/5 rounded-2xl object-cover shadow-xl"
                  />
                ))}
              </div>
              <span className="mt-5 block text-center text-xl text-slate-200/80">
                在制备多色发光织物中依旧有效
              </span>
            </div>

            <div className="flex justify-between gap-5">
              {applicationImages.map((item) => (
                <figure
                  key={item.src}
                  className="relative flex flex-col items-center flex-1 rounded-3xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="h-[400px] object-cover"
                    data-preview-image={item.src}
                  />
                  <figcaption className="text-xl text-slate-200/80 mt-5">
                    {item.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
