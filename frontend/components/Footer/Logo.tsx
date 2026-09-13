import Image from "next/image";

export interface LogoProps {
  className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      <div className="mb-[clamp(0.25rem,0.3472222222vw,0.46875rem)] flex items-center justify-between gap-5 xl:justify-start xl:gap-[30.45px]">
        <Image
          src="/logo-white.svg"
          alt="HK Tramways"
          width={200}
          height={60}
          className="h-auto w-[clamp(10rem,13.8888888889vw,18.75rem)]"
        />
        <Image
          src="/footer/caringCompany.png"
          alt="15+ Years Caring Company"
          width={124}
          height={55}
          className="h-auto w-[clamp(4.7rem,6.5277777778vw,8.8125rem)]"
        />
      </div>
    </div>
  );
}
