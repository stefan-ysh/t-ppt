import { LightRays } from "@/components/ui/light-rays";
export default function Slide8() {
  return (
    <section data-background="#121826" className="!inset-0 pt-5">
      <h3 className="text-center">防水发光纤维膜的合成机理</h3>

      <div className="absolute top-0 flex w-full h-full justify-between px-40 items-center text-3xl text-white">
        <span className="absolute left-52 top-[110px] font-bold">
          CsPbBr3@HPβCD@PFOS composites
        </span>
        <img
          src="/images/只要圆 拷贝.png"
          className="w-1/2 absolute top-[-10] left-0"
        />
        <span className="absolute top-20 right-96">water repelling</span>
        <span className="absolute top-[450px] right-48">
          CsPbBr3@HPβCD@PFOS fiber
        </span>
        <span className="absolute bottom-48 right-20">
          CsPbBr3@HPβCD on PS matrix
        </span>
        <span className="absolute right-96 bottom-32 font-bold">
          sectional drawing
        </span>
        <span className="absolute bottom-[60px] left-[200px]">Br</span>
        <span className="absolute bottom-[60px] left-[400px]">Pb</span>
        <span className="absolute bottom-[60px] left-[600px]">Cs</span>
        <span className="absolute bottom-[60px] left-[800px]">CsPbBr3 nanocrystal</span>
        <span className="absolute bottom-[60px] left-[1300px]">HPBCD cluster</span>
        <span className="absolute bottom-[60px] right-20">PFOS</span>
        <img
          src="/images/未标题-1 拷贝.png"
          className="w-1/2 absolute top-[-20] right-0"
        />
      </div>
      <div className="w-fullflex justify-center items-center absolute bottom-0">
        <img src="/images/图例.png" className="w-full" />
      </div>
    </section>
  );
}
