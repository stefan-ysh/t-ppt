export default function Slide17() {
  return (
    <section data-background="#010409" className="!inset-0">
      <div className="relative flex h-full w-full items-center justify-between overflow-hidden px-12 py-16 text-white">
        <div className="relative w-3/5">
          <div className="relative flex w-full flex-col gap-6  px-6 backdrop-blur">
            <img
              src="/images/17-1.png"
              alt="日间展示"
              className="w-full object-cover"
            />
            <img
              src="/images/17-2.png"
              alt="夜间展示"
              className="w-full object-cover"
            />
          </div>
        </div>

        <div
          className="flex w-2/5 absolute top-[50px] right-0 flex-col items-center gap-6  text-center"
          style={{
            background:
              "linear-gradient(270deg, rgb(83, 101, 143) 0%, rgb(255, 255, 255) 100%, rgb(255, 255, 255) 100%)",
          }}
        >
          <div className="w-full flex items-center justify-between gap-6">
            <img
              src="/images/sun.gif"
              alt="阳光"
              className="h-48 w-48 object-contain"
            />
            <svg
              viewBox="0 0 100 50"
              style={{ transform: "rotate(45deg)" }}
              className="sunlight-arrow absolute z-50 top-36 left-32 h-24 w-28 object-contain"
            >
              <defs>
                <linearGradient
                  id="rainbowGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop
                    offset="0%"
                    style={{ stopColor: "#FF0000", stopOpacity: 1 }}
                  />
                  <stop
                    offset="16.67%"
                    style={{ stopColor: "#FF7F00", stopOpacity: 1 }}
                  />
                  <stop
                    offset="33.33%"
                    style={{ stopColor: "#FFFF00", stopOpacity: 1 }}
                  />
                  <stop
                    offset="50%"
                    style={{ stopColor: "#00FF00", stopOpacity: 1 }}
                  />
                  <stop
                    offset="66.67%"
                    style={{ stopColor: "#0000FF", stopOpacity: 1 }}
                  />
                  <stop
                    offset="83.33%"
                    style={{ stopColor: "#4B0082", stopOpacity: 1 }}
                  />
                  <stop
                    offset="100%"
                    style={{ stopColor: "#9400D3", stopOpacity: 1 }}
                  />
                </linearGradient>
              </defs>
              <path
                d="M 0 15 L 70 15 L 70 8 L 90 25 L 70 42 L 70 35 L 0 35 Z"
                fill="url(#rainbowGradient)"
                opacity="0.9"
              >
                <animate
                  attributeName="opacity"
                  values="0.5;1;0.5"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </path>
            </svg>
            {/* <div className="h-24 w-28 rounded-full bg-gradient-to-br from-yellow-400 via-rose-500 to-indigo-600 opacity-80" /> */}
            <img
              src="/images/moon.gif"
              alt="月光"
              className="h-48 w-48 object-contain"
            />
          </div>
          <img
            src="/images/17-3.png"
            alt="长余辉材料结构示意"
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
}
