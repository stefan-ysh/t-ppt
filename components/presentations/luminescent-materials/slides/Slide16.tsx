export default function Slide16() {
  return (
    <section data-background="#010409" className="!inset-0">
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
        <img
          src="/images/16-1.png"
          alt="长余辉光织物示意"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <video
          className="absolute right-20 top-[50px] z-10 h-[350px] w-[650px]  object-cover"
          src="/images/16-2.mp4"
          autoPlay
          muted
          loop
          playsInline
          controls={false}
        />
      </div>
    </section>
  );
}
