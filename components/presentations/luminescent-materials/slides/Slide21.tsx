export default function Slide21() {
  return (
    <section data-background="#030712" className="!inset-0">
      <div className="flex h-full w-full items-center justify-center overflow-hidden bg-black">
        <video
          className="h-full w-full object-contain"
          src="/images/20.mp4"
          // data-autoplay
          muted
          loop
          playsInline
          controls
        />
      </div>
    </section>
  );
}
