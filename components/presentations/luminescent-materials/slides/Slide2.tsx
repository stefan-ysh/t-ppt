import Image from "next/image";
export default function Slide2() {
  return (
    <section data-background="#030712" className="!inset-0">
      <div className="flex w-full absolute inset-0">
        {/* 左侧个人信息 */}
        <div className="flex flex-col justify-center w-1/2 items-center">
          {/* 个人照片 */}
          <Image
            src="/images/tina.png"
            alt="扬州大学 田甜 发光材料 钙钛矿 DAST 光电纳米材料"
            className="object-cover"
            width="810"
            height="700"
          />
          {/* 姓名 */}
          <div className="absolute top-48 left-24 italic">
            <h4 className="text-4xl font-bold mb-2 text-white">田甜</h4>
            <h6 className="text-2xl opacity-50 text-white">Tian Tian</h6>
          </div>
        </div>

        {/* 右侧教育经历时间轴 */}
        <div className="flex flex-col justify-center w-1/2 px-5">
          <div className="relative">
            {/* 时间轴线条 */}
            <div className="absolute left-10 top-0 bottom-0 w-[1px] bg-[rgba(255,255,255,0.3)]" />

            {/* 教育经历项目 */}
            <div className="flex flex-col gap-10">
              {[
                {
                  year: "2010 - 2014",
                  school: "西北民族大学",
                  degree: "学士学位",
                },
                {
                  year: "2014 - 2020",
                  school: "上海理工大学/丹麦科技大学",
                  degree: "硕士/博士学位",
                },
                { year: "2020 - 2023", school: "中山大学", degree: "博士后" },
                {
                  year: "2023 - 至今",
                  school: "扬州大学",
                  degree: "特聘教授、江苏省科技副司、省青年托举人才",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-center relative">
                  <div className="w-3 h-3 rounded-full absolute left-[35px] z-10 bg-[rgba(255,255,255,0.8)]" />
                  <div className="text-lg font-mono ml-20 italic text-white">
                    {item.year}
                  </div>
                  <div className="backdrop-blur-sm rounded-xl px-4 py-2 ml-8 flex-1 bg-[rgba(255,255,255,0.1)] transition-all duration-300 ease-in-out hover:bg-[rgba(255,255,255,0.2)] hover:translate-x-2">
                    <span className="text-lg text-white">{item.school}</span>
                    <br />
                    <span className="text-lg text-[rgba(255,255,255,0.6)]">
                      {item.degree}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 底部研究信息 */}
        <div className="absolute bottom-20 right-5">
          <p className="text-2xl leading-relaxed text-[rgba(255,255,255,0.8)]">
            主要研究方向为光电纳米材料，团队目前现有杨德芳、李文广和雷昌盛教师4名，博士后1名，博士生2名，研究生22名
          </p>
        </div>
      </div>
    </section>
  );
}
