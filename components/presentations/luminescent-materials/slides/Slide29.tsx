export default function Slide29() {
  return (
    <section
      data-background-image="/images/last-bg.jpg"
      data-background-size="cover"
      data-background-position="center center"
      className="!inset-0"
    >
      <div className="w-full text-center flex flex-col items-center justify-center h-full gap-8">
        <p className="text-4xl text-slate-100/90">
          从实验室纳米发光颗粒到商用自发光膜，我们持续探索光织物的全新边界，打造安全、节能、可持续的主动光解决方案
        </p>
        <p className="text-3xl italic text-emerald-200">谢谢！</p>
      </div>

      <div className="flex flex-col items-center gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur absolute right-10 bottom-10">
        <img
          src="https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=https%3A%2F%2Fu.wechat.com%2FENlWXIR-iMEhMaamDD7FI0Q%3Fs%3D4"
          alt="联系二维码"
          className="h-52 w-52 rounded-2xl object-cover p-5"
        />
      </div>
    </section>
  );
}
