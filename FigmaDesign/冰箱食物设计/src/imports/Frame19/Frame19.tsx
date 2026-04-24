import img1 from "./07bfcb317afd8424072d11e2b68c09c30f891365.png";

export default function Frame() {
  return (
    <div className="relative size-full">
      <div className="absolute left-0 size-[240px] top-0">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 240 240">
          <circle cx="120" cy="120" fill="var(--fill-0, black)" id="Ellipse 80" r="120" />
        </svg>
      </div>
      <div className="absolute bg-[#20201f] border border-[#006500] border-solid h-[61px] left-[35px] rounded-[50px] top-[89px] w-[170px]" />
      <p className="absolute font-['DM_Sans:Bold',sans-serif] font-bold leading-[normal] left-[58px] text-[24px] text-white top-[96px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        Milk
      </p>
      <p className="absolute font-['DM_Sans:ExtraLight',sans-serif] font-extralight leading-[normal] left-[58px] text-[10px] text-white top-[122px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        START: 2026/4/1
      </p>
      <p className="absolute font-['DM_Sans:ExtraLight',sans-serif] font-extralight leading-[normal] left-[58px] text-[10px] text-white top-[134px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        END: 2026/4/5
      </p>
      <div className="absolute bg-[#077101] h-[29px] left-[164px] rounded-[10px] top-[105px] w-[34px]" />
      <div className="absolute left-[171px] size-[20px] top-[110px]" data-name="安全 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img1} />
      </div>
    </div>
  );
}