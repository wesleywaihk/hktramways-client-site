import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button/Button";
import { socialLinks, fares, paymentIcons } from "./footerData";

const columnHeading =
  "font-sans text-[18px] leading-[152%] font-semibold tracking-[0.02em] m-0 mb-4 lg:text-[21px] lg:leading-[152%] lg:mb-5";

export default function Footer() {
  return (
    <footer className="bg-green pt-[60px] pb-[32px] text-white lg:pt-[80px] lg:pb-[50px]">
      <div className="flex flex-col gap-8 px-5 lg:grid lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:items-start lg:gap-10 lg:px-10">
        <div className="flex flex-col lg:order-1">
          <div className="flex items-center gap-4">
            <Image
              src="/logo-white.svg"
              alt="HK Tramways"
              width={200}
              height={60}
              className="h-[50px] w-[167px] lg:h-[60px] lg:w-[200px]"
            />
            <Image
              src="/footer/caringCompany.png"
              alt="15+ Years Caring Company"
              width={94}
              height={50}
              className="h-10 w-auto lg:h-[50px]"
            />
          </div>

          <div className="hidden lg:mt-6 lg:flex lg:items-center lg:gap-2.5">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="flex h-8 w-[26px] items-center justify-center rounded-[21px] p-0.5 hover:opacity-80"
              >
                <Image
                  src={social.icon}
                  alt=""
                  width={22}
                  height={22}
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>

          <p className="mt-6 hidden font-sans text-[13px] leading-[145%] tracking-[0.02em] opacity-[0.85] lg:block">
            A member of RATP Dev Group
            <br />© Hong Kong Tramways Limited. All rights reserved.
          </p>
          <Link
            href="/disclaimer"
            className="mt-2 hidden font-sans text-[13px] leading-[145%] tracking-[0.02em] underline hover:opacity-80 lg:inline-block"
          >
            Disclaimer &amp; Privacy Policy
          </Link>
        </div>

        <div className="flex flex-col lg:order-4">
          <h3 className={columnHeading}>Fares &amp; Payment Methods</h3>
          <div className="rounded-xl border-2 border-white p-5">
            <div className="mb-4 flex items-center gap-5">
              {paymentIcons.map((icon) => (
                <Image
                  key={icon}
                  src={icon}
                  alt=""
                  width={20}
                  height={20}
                  className="h-5 w-5"
                  aria-hidden="true"
                />
              ))}
            </div>
            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              {fares.map((fare) => (
                <li
                  key={fare.label}
                  className="flex items-center justify-between font-sans text-[15px] leading-[163%] tracking-[0.02em] lg:text-[16px] lg:leading-[163%]"
                >
                  <span>{fare.label}</span>
                  <span>{fare.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex justify-between gap-5 lg:order-2 lg:block">
          <div className="flex-1">
            <h3 className={columnHeading}>Download App</h3>
            <div className="flex flex-col gap-[15px]">
              <a
                href="https://play.google.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/footer/googlePlay.png"
                  alt="Get it on Google Play"
                  width={140}
                  height={46}
                  className="h-auto w-[140px]"
                />
              </a>
              <a
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/footer/appStore.png"
                  alt="Download on the App Store"
                  width={140}
                  height={46}
                  className="h-auto w-[140px]"
                />
              </a>
            </div>
          </div>

          <div className="flex-1 lg:hidden">
            <h3 className={columnHeading}>Follow Us</h3>
            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              {socialLinks.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-[15px] leading-[163%] tracking-[0.02em] hover:opacity-80"
                  >
                    {social.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="hidden flex-col items-start lg:order-3 lg:flex">
          <h3 className={columnHeading}>Get in Touch</h3>
          <p className="m-0 mb-6 font-sans text-[15px] leading-[163%] tracking-[0.02em] lg:mb-7 lg:text-[16px] lg:leading-[163%]">
            Find us for enquiries, lost items, or suggestions
          </p>
          <Button href="/contact-us" useArrow>
            Contact Us
          </Button>
        </div>

        <div className="h-0.5 w-full bg-white/15 lg:hidden" />
        <p className="m-0 block text-center font-sans text-[13px] leading-[145%] tracking-[0.02em] opacity-[0.85] lg:hidden">
          A member of RATP Dev Group
          <br />© Hong Kong Tramways Limited. All rights reserved.
        </p>
        <Link
          href="/disclaimer"
          className="block text-center font-sans text-[13px] leading-[145%] tracking-[0.02em] underline hover:opacity-80 lg:hidden"
        >
          Disclaimer &amp; Privacy Policy
        </Link>
      </div>
    </footer>
  );
}
