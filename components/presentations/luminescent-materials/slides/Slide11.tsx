export default function Slide11() {
  return (
    <>
      <section data-background="#030712" className="!inset-0" data-auto-animate>
        <div
          className="grid h-full w-full grid-cols-12 gap-0 overflow-hidden p-0 text-white"
          data-auto-animate
        >
          <div
            className="relative col-span-5 flex flex-col gap-0 "
            data-auto-animate
          >
            <div className="relative overflow-hidden " data-auto-animate>
              <video
                data-id="1231"
                className="h-full w-full object-cover"
                src="/images/发光材料水下可见性演示.mov"
                data-autoplay
                muted
                loop
                playsInline
              />
            </div>
            <div
              data-id="blue-overlay"
              className="absolute top-0 bottom-0 bg-[#081d57dd]  w-full"
              style={{
                left: "-100%",
              }}
            />

            <div className="flex flex-col absolute top-10 w-full items-center">
              {[
                {
                  src: "/images/111111.png",
                  caption: "水下稳定性测试",
                  left: "-100%",
                },
                {
                  src: "/images/22222.png",
                  caption: "耐久性对比",
                  left: "-100%",
                },
                {
                  src: "/images/33333.png",
                  caption: "环境适应性",
                  left: "-100%",
                },
              ].map((item) => (
                <figure
                  key={item.src}
                  className="overflow-hidden absolute w-4/5  "
                  style={{
                    top: `${
                      350 *
                      [
                        "/images/111111.png",
                        "/images/22222.png",
                        "/images/33333.png",
                      ].indexOf(item.src)
                    }px`,
                    left: item.left,
                    transition: "opacity 1s ease-in-out",
                  }}
                >
                  <img
                    src={item.src}
                    alt={item.caption}
                    className="w-full h-80"
                  />
                  {/* <figcaption className="px-4 py-3 text-sm text-slate-200/80">
                    {item.caption}
                  </figcaption> */}
                </figure>
              ))}
            </div>
          </div>

          <div className="relative col-span-7 flex h-full flex-col justify-between overflow-hidden  p-0">
            <div
              className="absolute w-full text-xl"
              data-id="text-r-t"
              style={{
                top: "-25px",
              }}
            >
              PVK 纤维膜在水中浸泡 3260 小时后，荧光强度仍保持
              85%，且测得铅离子泄露远低于安全阈值。
            </div>

            <img
              src="/images/r.png"
              style={{
                bottom: "120px",
              }}
              alt="研究成果认证"
              className="absolute  right-4 w-full opacity-100"
            />
          </div>
        </div>
      </section>
      <section data-background="#030712" className="!inset-0" data-auto-animate>
        <div
          className="grid h-full w-full grid-cols-12 gap-0 overflow-hidden p-0 text-white"
          data-auto-animate
        >
          <div
            className="relative col-span-5 flex flex-col gap-0 "
            data-auto-animate
          >
            <div className="relative overflow-hidden " data-auto-animate>
              <video
                data-id="1231"
                className="h-full w-full object-cover"
                src="/images/发光材料水下可见性演示.mov"
                data-autoplay
                muted
                loop
                playsInline
              />
            </div>
            <div
              className="absolute top-0 bottom-0 bg-[#081d57dd] w-full"
              data-id="blue-overlay"
              style={{
                left: 0,
              }}
            />

            <div className="flex flex-col absolute top-10 w-full items-center">
              {[
                {
                  src: "/images/111111.png",
                  caption: "水下稳定性测试",
                  left: "80px",
                },
                {
                  src: "/images/22222.png",
                  caption: "耐久性对比",
                  left: "-100%",
                },
                {
                  src: "/images/33333.png",
                  caption: "环境适应性",
                  left: "-100%",
                },
              ].map((item) => (
                <figure
                  key={item.src}
                  className="overflow-hidden absolute w-4/5  "
                  style={{
                    top: `${
                      350 *
                      [
                        "/images/111111.png",
                        "/images/22222.png",
                        "/images/33333.png",
                      ].indexOf(item.src)
                    }px`,
                    left: item.left,
                    transition: "opacity 1s ease-in-out",
                  }}
                >
                  <img
                    src={item.src}
                    alt={item.caption}
                    className="w-full h-80"
                  />
                  {/* <figcaption className="px-4 py-3 text-sm text-slate-200/80">
                    {item.caption}
                  </figcaption> */}
                </figure>
              ))}
            </div>
          </div>

          <div className="relative col-span-7 flex h-full flex-col justify-between overflow-hidden  p-0">
            <div
              data-id="text-r-t"
              className="absolute w-full text-xl"
              style={{
                top: "-25px",
              }}
            >
              PVK 纤维膜在水中浸泡 3260 小时后，荧光强度仍保持
              85%，且测得铅离子泄露远低于安全阈值。
            </div>

            <img
              src="/images/r.png"
              style={{
                bottom: "120px",
              }}
              alt="研究成果认证"
              className="absolute  right-4 w-full opacity-100"
            />
          </div>
        </div>
      </section>
      <section data-background="#030712" className="!inset-0" data-auto-animate>
        <div
          className="grid h-full w-full grid-cols-12 gap-0 overflow-hidden p-0 text-white"
          data-auto-animate
        >
          <div
            className="relative col-span-5 flex flex-col gap-0 "
            data-auto-animate
          >
            <div className="relative overflow-hidden " data-auto-animate>
              <video
                data-id="1231"
                className="h-full w-full object-cover"
                src="/images/发光材料水下可见性演示.mov"
                data-autoplay
                muted
                loop
                playsInline
              />
            </div>
            <div
              className="absolute top-0 bottom-0 bg-[#081d57dd] w-full"
              data-id="blue-overlay"
              style={{
                left: 0,
              }}
            />

            <div className="flex flex-col absolute top-10 w-full items-center">
              {[
                {
                  src: "/images/111111.png",
                  caption: "水下稳定性测试",
                  left: "80px",
                },
                {
                  src: "/images/22222.png",
                  caption: "耐久性对比",
                  left: "80px",
                },
                {
                  src: "/images/33333.png",
                  caption: "环境适应性",
                  left: "-100%",
                },
              ].map((item) => (
                <figure
                  key={item.src}
                  className="overflow-hidden absolute w-4/5  "
                  style={{
                    top: `${
                      350 *
                      [
                        "/images/111111.png",
                        "/images/22222.png",
                        "/images/33333.png",
                      ].indexOf(item.src)
                    }px`,
                    left: item.left,
                    transition: "opacity 1s ease-in-out",
                  }}
                >
                  <img
                    src={item.src}
                    alt={item.caption}
                    className="w-full h-80"
                  />
                  {/* <figcaption className="px-4 py-3 text-sm text-slate-200/80">
                    {item.caption}
                  </figcaption> */}
                </figure>
              ))}
            </div>
          </div>

          <div className="relative col-span-7 flex h-full flex-col justify-between overflow-hidden  p-0">
            <div
              data-id="text-r-t"
              className="absolute w-full text-xl"
              style={{
                top: "-25px",
              }}
            >
              PVK 纤维膜在水中浸泡 3260 小时后，荧光强度仍保持
              85%，且测得铅离子泄露远低于安全阈值。
            </div>

            <img
              src="/images/r.png"
              style={{
                bottom: "120px",
              }}
              alt="研究成果认证"
              className="absolute  right-4 w-full opacity-100"
            />
          </div>
        </div>
      </section>
      <section data-background="#030712" className="!inset-0" data-auto-animate>
        <div
          className="grid h-full w-full grid-cols-12 gap-0 overflow-hidden p-0 text-white"
          data-auto-animate
        >
          <div
            className="relative col-span-5 flex flex-col gap-0 "
            data-auto-animate
          >
            <div className="relative overflow-hidden " data-auto-animate>
              <video
                data-id="1231"
                className="h-full w-full object-cover"
                src="/images/发光材料水下可见性演示.mov"
                data-autoplay
                muted
                loop
                playsInline
              />
            </div>
            <div
              className="absolute top-0 bottom-0 bg-[#081d57dd] w-full"
              data-id="blue-overlay"
              style={{
                left: 0,
              }}
            />

            <div className="flex flex-col absolute top-10 w-full items-center">
              {[
                {
                  src: "/images/111111.png",
                  caption: "水下稳定性测试",
                  left: "80px",
                },
                {
                  src: "/images/22222.png",
                  caption: "耐久性对比",
                  left: "80px",
                },
                {
                  src: "/images/33333.png",
                  caption: "环境适应性",
                  left: "80px",
                },
              ].map((item) => (
                <figure
                  key={item.src}
                  className="overflow-hidden absolute w-4/5  "
                  style={{
                    top: `${
                      350 *
                      [
                        "/images/111111.png",
                        "/images/22222.png",
                        "/images/33333.png",
                      ].indexOf(item.src)
                    }px`,
                    left: item.left,
                    transition: "opacity 1s ease-in-out",
                  }}
                >
                  <img
                    src={item.src}
                    alt={item.caption}
                    className="w-full h-80"
                  />
                  {/* <figcaption className="px-4 py-3 text-sm text-slate-200/80">
                    {item.caption}
                  </figcaption> */}
                </figure>
              ))}
            </div>
          </div>

          <div className="relative col-span-7 flex h-full flex-col justify-between overflow-hidden  p-0">
            <div
              data-id="text-r-t"
              className="absolute w-full text-xl"
              style={{
                top: "-25px",
              }}
            >
              PVK 纤维膜在水中浸泡 3260 小时后，荧光强度仍保持
              85%，且测得铅离子泄露远低于安全阈值。
            </div>
            <img
              src="/images/r.png"
              style={{
                bottom: "120px",
              }}
              alt="研究成果认证"
              className="absolute  right-4 w-full opacity-100"
            />
          </div>
        </div>
      </section>
      <section data-background="#030712" className="!inset-0" data-auto-animate>
        <div
          className="grid h-full w-full grid-cols-12 gap-0 overflow-hidden p-0 text-white"
          data-auto-animate
        >
          <div
            className="relative col-span-5 flex flex-col gap-0 "
            data-auto-animate
          >
            <div className="relative overflow-hidden " data-auto-animate>
              <video
                data-id="1231"
                className="h-full w-full object-cover"
                src="/images/发光材料水下可见性演示.mov"
                data-autoplay
                muted
                loop
                playsInline
              />
            </div>
            <div
              className="absolute top-0 bottom-0 bg-[#081d57dd] w-full"
              data-id="blue-overlay"
              style={{
                left: 0,
              }}
            />

            <div className="flex flex-col absolute top-10 w-full items-center">
              {[
                {
                  src: "/images/111111.png",
                  caption: "水下稳定性测试",
                  left: "80px",
                },
                {
                  src: "/images/22222.png",
                  caption: "耐久性对比",
                  left: "80px",
                },
                {
                  src: "/images/33333.png",
                  caption: "环境适应性",
                  left: "80px",
                },
              ].map((item) => (
                <figure
                  key={item.src}
                  className="overflow-hidden absolute w-4/5  "
                  style={{
                    top: `${
                      350 *
                      [
                        "/images/111111.png",
                        "/images/22222.png",
                        "/images/33333.png",
                      ].indexOf(item.src)
                    }px`,
                    left: item.left,
                    transition: "opacity 1s ease-in-out",
                  }}
                >
                  <img
                    src={item.src}
                    alt={item.caption}
                    className="w-full h-80"
                  />
                  {/* <figcaption className="px-4 py-3 text-sm text-slate-200/80">
                    {item.caption}
                  </figcaption> */}
                </figure>
              ))}
            </div>
          </div>

          <div className="relative col-span-7 flex h-full flex-col justify-between overflow-hidden  p-0">
            <img
              src="/images/0000.png"
              alt="水下应用示意"
              className="absolute inset-0  -top-[1400px] -z-10 h-full w-full object-cover"
            />

            <div
              className="absolute w-full text-xl"
              data-id="text-r-t"
              style={{
                top: "5px",
              }}
            >
              PVK 纤维膜在水中浸泡 3260 小时后，荧光强度仍保持
              85%，且测得铅离子泄露远低于安全阈值。
            </div>

            <img
              src="/images/r.png"
              style={{
                bottom: "120px",
              }}
              alt="研究成果认证"
              className="absolute  right-4 w-full opacity-100"
            />
          </div>
        </div>
      </section>
      <section data-background="#030712" className="!inset-0" data-auto-animate>
        <div
          className="grid h-full w-full grid-cols-12 gap-0 overflow-hidden p-0 text-white"
          data-auto-animate
        >
          <div
            className="relative col-span-5 flex flex-col gap-0 "
            data-auto-animate
          >
            <div className="relative overflow-hidden " data-auto-animate>
              <video
                data-id="1231"
                className="h-full w-full object-cover"
                src="/images/发光材料水下可见性演示.mov"
                data-autoplay
                muted
                loop
                playsInline
              />
            </div>
            <div
              className="absolute top-0 bottom-0 bg-[#081d57dd] w-full"
              data-id="blue-overlay"
              style={{
                left: 0,
              }}
            />

            <div className="flex flex-col absolute top-10 w-full items-center">
              {[
                {
                  src: "/images/111111.png",
                  caption: "水下稳定性测试",
                  left: "80px",
                },
                {
                  src: "/images/22222.png",
                  caption: "耐久性对比",
                  left: "80px",
                },
                {
                  src: "/images/33333.png",
                  caption: "环境适应性",
                  left: "80px",
                },
              ].map((item) => (
                <figure
                  key={item.src}
                  className="overflow-hidden absolute w-4/5  "
                  style={{
                    top: `${
                      350 *
                      [
                        "/images/111111.png",
                        "/images/22222.png",
                        "/images/33333.png",
                      ].indexOf(item.src)
                    }px`,
                    left: item.left,
                    transition: "opacity 1s ease-in-out",
                  }}
                >
                  <img
                    src={item.src}
                    alt={item.caption}
                    className="w-full h-80"
                  />
                  {/* <figcaption className="px-4 py-3 text-sm text-slate-200/80">
                    {item.caption}
                  </figcaption> */}
                </figure>
              ))}
            </div>
          </div>

          <div className="relative col-span-7 flex h-full flex-col justify-between overflow-hidden  p-0">
            <img
              src="/images/0000.png"
              alt="水下应用示意"
              className="absolute inset-0 top-[0] -z-10 h-full w-full object-cover"
            />

            <div
              className="absolute w-full text-xl"
              data-id="text-r-t"
              style={{
                top: "1500px",
              }}
            >
              PVK 纤维膜在水中浸泡 3260 小时后，荧光强度仍保持
              85%，且测得铅离子泄露远低于安全阈值。
            </div>
            {/* <div className="absolute inset-0 bg-[#082c47bb]"></div> */}

            <div className="space-y-6">
              {[
                {
                  title: "全球首创",
                  description:
                    "室温空气工艺下制备柔性绿光光织膜，实现米级卷对卷生产",
                  right: "-100%",
                },
                {
                  title: "超强稳定性",
                  description:
                    "3260 小时水下浸泡后仍保持 85% 发光强度，铅泄露低于国际安全标准",
                  right: "-100%",
                },
                {
                  title: "多场景应用",
                  description:
                    "深海救援、动态显示织物、节能照明等跨行业场景均可快速落地",
                  right: "-100%",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="absolute top-10 w-full border border-slate-600/40 bg-slate-900/60 p-5 shadow-lg backdrop-blur text-left"
                  style={{
                    right: item.right,
                  }}
                >
                  <h4 className="text-xl font-semibold text-emerald-200">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-3xl text-slate-200/80">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <img
              src="/images/r.png"
              style={{
                bottom: "-1200px",
              }}
              alt="研究成果认证"
              className="absolute  right-4 w-full opacity-100"
            />
          </div>
        </div>
      </section>
      <section data-background="#030712" className="!inset-0" data-auto-animate>
        <div
          className="grid h-full w-full grid-cols-12 gap-0 overflow-hidden p-0 text-white"
          data-auto-animate
        >
          <div
            className="relative col-span-5 flex flex-col gap-0 "
            data-auto-animate
          >
            <div className="relative overflow-hidden " data-auto-animate>
              <video
                data-id="1231"
                className="h-full w-full object-cover"
                src="/images/发光材料水下可见性演示.mov"
                data-autoplay
                muted
                loop
                playsInline
              />
            </div>
            <div
              className="absolute top-0 bottom-0 bg-[#081d57dd] w-full"
              data-id="blue-overlay"
              style={{
                left: 0,
              }}
            />

            <div className="flex flex-col absolute top-10 w-full items-center">
              {[
                {
                  src: "/images/111111.png",
                  caption: "水下稳定性测试",
                  left: "80px",
                },
                {
                  src: "/images/22222.png",
                  caption: "耐久性对比",
                  left: "80px",
                },
                {
                  src: "/images/33333.png",
                  caption: "环境适应性",
                  left: "80px",
                },
              ].map((item) => (
                <figure
                  key={item.src}
                  className="overflow-hidden absolute w-4/5  "
                  style={{
                    top: `${
                      350 *
                      [
                        "/images/111111.png",
                        "/images/22222.png",
                        "/images/33333.png",
                      ].indexOf(item.src)
                    }px`,
                    left: item.left,
                    transition: "opacity 1s ease-in-out",
                  }}
                >
                  <img
                    src={item.src}
                    alt={item.caption}
                    className="w-full h-80"
                  />
                  {/* <figcaption className="px-4 py-3 text-sm text-slate-200/80">
                    {item.caption}
                  </figcaption> */}
                </figure>
              ))}
            </div>
          </div>

          <div className="relative col-span-7 flex h-full flex-col justify-between overflow-hidden  p-0">
            <img
              src="/images/0000.png"
              alt="水下应用示意"
              className="absolute inset-0 top-[0] -z-10 h-full w-full object-cover opacity-30"
            />
            <div
              className="absolute w-full text-xl"
              data-id="text-r-t"
              style={{
                top: "1500px",
              }}
            >
              PVK 纤维膜在水中浸泡 3260 小时后，荧光强度仍保持
              85%，且测得铅离子泄露远低于安全阈值。
            </div>
            {/* <div className="absolute inset-0 bg-[#082c47bb]"></div> */}

            <div className="space-y-6">
              {[
                {
                  title: "全球首创",
                  description:
                    "室温空气工艺下制备柔性绿光光织膜，实现米级卷对卷生产",
                  right: "0",
                },
                {
                  title: "超强稳定性",
                  description:
                    "3260 小时水下浸泡后仍保持 85% 发光强度，铅泄露低于国际安全标准",
                  right: "-100%",
                },
                {
                  title: "多场景应用",
                  description:
                    "深海救援、动态显示织物、节能照明等跨行业场景均可快速落地",
                  right: "-100%",
                },
              ].map((item, i) => (
                <div
                  key={item.title}
                  className="absolute top-10 w-full border border-slate-600/40 bg-slate-900/60 p-5 shadow-lg backdrop-blur text-left"
                  style={{
                    right: item.right,
                    top: `${90 + i * 350}px`,
                  }}
                >
                  <h4 className="text-xl font-semibold text-emerald-200">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-3xl text-slate-200/80">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <img
              src="/images/r.png"
              style={{
                bottom: "-1200px",
              }}
              alt="研究成果认证"
              className="absolute  right-4 w-full opacity-100"
            />
          </div>
        </div>
      </section>
      <section data-background="#030712" className="!inset-0" data-auto-animate>
        <div
          className="grid h-full w-full grid-cols-12 gap-0 overflow-hidden p-0 text-white"
          data-auto-animate
        >
          <div
            className="relative col-span-5 flex flex-col gap-0 "
            data-auto-animate
          >
            <div className="relative overflow-hidden " data-auto-animate>
              <video
                data-id="1231"
                className="h-full w-full object-cover"
                src="/images/发光材料水下可见性演示.mov"
                data-autoplay
                muted
                loop
                playsInline
              />
            </div>
            <div
              className="absolute top-0 bottom-0 bg-[#081d57dd] w-full"
              data-id="blue-overlay"
              style={{
                left: 0,
              }}
            />

            <div className="flex flex-col absolute top-10 w-full items-center">
              {[
                {
                  src: "/images/111111.png",
                  caption: "水下稳定性测试",
                  left: "80px",
                },
                {
                  src: "/images/22222.png",
                  caption: "耐久性对比",
                  left: "80px",
                },
                {
                  src: "/images/33333.png",
                  caption: "环境适应性",
                  left: "80px",
                },
              ].map((item) => (
                <figure
                  key={item.src}
                  className="overflow-hidden absolute w-4/5  "
                  style={{
                    top: `${
                      350 *
                      [
                        "/images/111111.png",
                        "/images/22222.png",
                        "/images/33333.png",
                      ].indexOf(item.src)
                    }px`,
                    left: item.left,
                    transition: "opacity 1s ease-in-out",
                  }}
                >
                  <img
                    src={item.src}
                    alt={item.caption}
                    className="w-full h-80"
                  />
                  {/* <figcaption className="px-4 py-3 text-sm text-slate-200/80">
                    {item.caption}
                  </figcaption> */}
                </figure>
              ))}
            </div>
          </div>

          <div className="relative col-span-7 flex h-full flex-col justify-between overflow-hidden  p-0">
            <img
              src="/images/0000.png"
              alt="水下应用示意"
              className="absolute inset-0 top-[0] -z-10 h-full w-full object-cover opacity-30"
            />
            <div
              className="absolute w-full text-xl"
              data-id="text-r-t"
              style={{
                top: "1500px",
              }}
            >
              PVK 纤维膜在水中浸泡 3260 小时后，荧光强度仍保持
              85%，且测得铅离子泄露远低于安全阈值。
            </div>
            {/* <div className="absolute inset-0 bg-[#082c47bb]"></div> */}

            <div className="space-y-6">
              {[
                {
                  title: "全球首创",
                  description:
                    "室温空气工艺下制备柔性绿光光织膜，实现米级卷对卷生产",
                  right: "0",
                },
                {
                  title: "超强稳定性",
                  description:
                    "3260 小时水下浸泡后仍保持 85% 发光强度，铅泄露低于国际安全标准",
                  right: "0",
                },
                {
                  title: "多场景应用",
                  description:
                    "深海救援、动态显示织物、节能照明等跨行业场景均可快速落地",
                  right: "-100%",
                },
              ].map((item, i) => (
                <div
                  key={item.title}
                  className="absolute top-10 w-full border border-slate-600/40 bg-slate-900/60 p-5 shadow-lg backdrop-blur text-left"
                  style={{
                    right: item.right,
                    top: `${90 + i * 350}px`,
                  }}
                >
                  <h4 className="text-xl font-semibold text-emerald-200">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-3xl text-slate-200/80">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <img
              src="/images/r.png"
              style={{
                bottom: "-1200px",
              }}
              alt="研究成果认证"
              className="absolute  right-4 w-full opacity-100"
            />
          </div>
        </div>
      </section>
      <section data-background="#030712" className="!inset-0" data-auto-animate>
        <div
          className="grid h-full w-full grid-cols-12 gap-0 overflow-hidden p-0 text-white"
          data-auto-animate
        >
          <div
            className="relative col-span-5 flex flex-col gap-0 "
            data-auto-animate
          >
            <div className="relative overflow-hidden " data-auto-animate>
              <video
                data-id="1231"
                className="h-full w-full object-cover"
                src="/images/发光材料水下可见性演示.mov"
                data-autoplay
                muted
                loop
                playsInline
              />
            </div>
            <div
              className="absolute top-0 bottom-0 bg-[#081d57dd] w-full"
              data-id="blue-overlay"
              style={{
                left: 0,
              }}
            />

            <div className="flex flex-col absolute top-10 w-full items-center">
              {[
                {
                  src: "/images/111111.png",
                  caption: "水下稳定性测试",
                  left: "80px",
                },
                {
                  src: "/images/22222.png",
                  caption: "耐久性对比",
                  left: "80px",
                },
                {
                  src: "/images/33333.png",
                  caption: "环境适应性",
                  left: "80px",
                },
              ].map((item) => (
                <figure
                  key={item.src}
                  className="overflow-hidden absolute w-4/5  "
                  style={{
                    top: `${
                      350 *
                      [
                        "/images/111111.png",
                        "/images/22222.png",
                        "/images/33333.png",
                      ].indexOf(item.src)
                    }px`,
                    left: item.left,
                    transition: "opacity 1s ease-in-out",
                  }}
                >
                  <img
                    src={item.src}
                    alt={item.caption}
                    className="w-full h-80"
                  />
                  {/* <figcaption className="px-4 py-3 text-sm text-slate-200/80">
                    {item.caption}
                  </figcaption> */}
                </figure>
              ))}
            </div>
          </div>

          <div className="relative col-span-7 flex h-full flex-col justify-between overflow-hidden  p-0">
            <img
              src="/images/0000.png"
              alt="水下应用示意"
              className="absolute inset-0 top-[0] -z-10 h-full w-full object-cover opacity-30"
            />
            <div
              className="absolute w-full text-xl"
              data-id="text-r-t"
              style={{
                top: "1500px",
              }}
            >
              PVK 纤维膜在水中浸泡 3260 小时后，荧光强度仍保持
              85%，且测得铅离子泄露远低于安全阈值。
            </div>
            {/* <div className="absolute inset-0 bg-[#082c47bb]"></div> */}

            <div className="space-y-6">
              {[
                {
                  title: "全球首创",
                  description:
                    "室温空气工艺下制备柔性绿光光织膜，实现米级卷对卷生产",
                  right: "0",
                },
                {
                  title: "超强稳定性",
                  description:
                    "3260 小时水下浸泡后仍保持 85% 发光强度，铅泄露低于国际安全标准",
                  right: "0",
                },
                {
                  title: "多场景应用",
                  description:
                    "深海救援、动态显示织物、节能照明等跨行业场景均可快速落地",
                  right: "0",
                },
              ].map((item, i) => (
                <div
                  key={item.title}
                  className="absolute top-10 w-full border border-slate-600/40 bg-slate-900/60 p-5 shadow-lg backdrop-blur text-left"
                  style={{
                    right: item.right,
                    top: `${90 + i * 350}px`,
                  }}
                >
                  <h4 className="text-xl font-semibold text-emerald-200">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-3xl text-slate-200/80">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <img
              src="/images/r.png"
              style={{
                bottom: "-1200px",
              }}
              alt="研究成果认证"
              className="absolute  right-4 w-full opacity-100"
            />
          </div>
        </div>
      </section>

      {/* <section data-auto-animate></section> */}
    </>
  );
}
