import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button/Button";
import { socialLinks, fares, paymentIcons } from "./footerData";

const columnHeading =
  "font-sans text-[18px] leading-[152%] font-semibold tracking-[0.02em] m-0 mb-4 lg:text-[21px] lg:leading-[152%] lg:mb-5";

export default function Footer() {
  return (
    <footer className="bg-green text-white">
      <div className="p-5 lg:p-10 pt-0!">
        <div className="flex flex-col items-center gap-6 p-10 px-5 rounded-[21px] bg-green-light text-center lg:flex-row lg:justify-between lg:items-center lg:text-left lg:gap-10 lg:min-h-[373px] lg:py-0 lg:pl-10 lg:pr-20 lg:rounded-[30px]">
          <div className="shrink-0">
            <Image
              src="/footer/cat.png"
              alt=""
              width={476}
              height={426}
              aria-hidden="true"
              className="w-[180px] h-auto lg:w-[300px]"
            />
          </div>
          <div className="flex flex-col items-center lg:items-start lg:max-w-[480px]">
            <h2 className="font-sans text-[32px] leading-[118%] font-semibold tracking-[0.02em] m-0 lg:text-[42px] lg:leading-[118%]">
              Download HK Tramways App
            </h2>
            <p className="font-sans text-[15px] leading-[163%] tracking-[0.02em] mt-4 lg:text-[16px] lg:leading-[163%] lg:mt-5">
              Get our latest news of us, and track the time of next tram coming
              in your location easily!
            </p>
            <Button href="/app" color="white" className="mt-6 lg:mt-8" useArrow>
              Learn More
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-8 p-5 py-10 lg:grid lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-10 lg:p-10 lg:py-[60px] lg:items-start">
        <div className="flex flex-col lg:order-1">
          <div className="flex items-center gap-4">
            <Image
              src="/logo-white.svg"
              alt="HK Tramways"
              width={200}
              height={60}
              className="w-[167px] h-[50px] lg:w-[200px] lg:h-[60px]"
            />
            <Image
              src="/footer/caringCompany.png"
              alt="15+ Years Caring Company"
              width={94}
              height={50}
              className="h-10 w-auto lg:h-[50px]"
            />
          </div>

          <div className="hidden lg:flex lg:items-center lg:gap-2.5 lg:mt-6">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="flex items-center justify-center w-[26px] h-8 p-0.5 rounded-[21px] hover:opacity-80"
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

          <p className="hidden lg:block font-sans text-[13px] leading-[145%] tracking-[0.02em] mt-6 opacity-[0.85]">
            A member of RATP Dev Group
            <br />© Hong Kong Tramways Limited. All rights reserved.
          </p>
          <Link
            href="/disclaimer"
            className="hidden lg:inline-block font-sans text-[13px] leading-[145%] tracking-[0.02em] mt-2 underline hover:opacity-80"
          >
            Disclaimer &amp; Privacy Policy
          </Link>
        </div>

        <div className="flex flex-col lg:order-4">
          <h3 className={columnHeading}>Fares &amp; Payment Methods</h3>
          <div className="border-2 border-white rounded-xl p-5">
            <div className="flex items-center gap-5 mb-4">
              {paymentIcons.map((icon) => (
                <Image
                  key={icon}
                  src={icon}
                  alt=""
                  width={20}
                  height={20}
                  className="w-5 h-5"
                  aria-hidden="true"
                />
              ))}
            </div>
            <ul className="list-none m-0 p-0 flex flex-col gap-3">
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

        <div className="flex justify-between gap-5 lg:block lg:order-2">
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
                  className="w-[140px] h-auto"
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
                  className="w-[140px] h-auto"
                />
              </a>
            </div>
          </div>

          <div className="flex-1 lg:hidden">
            <h3 className={columnHeading}>Follow Us</h3>
            <ul className="list-none m-0 p-0 flex flex-col gap-3">
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

        <div className="hidden flex-col items-start lg:flex lg:order-3">
          <h3 className={columnHeading}>Get in Touch</h3>
          <p className="font-sans text-[15px] leading-[163%] tracking-[0.02em] m-0 mb-6 lg:text-[16px] lg:leading-[163%] lg:mb-7">
            Find us for enquiries, lost items, or suggestions
          </p>
          <Button href="/contact-us" useArrow>
            Contact Us
          </Button>
        </div>

        <div className="h-0.5 bg-white/15 w-full lg:hidden" />
        <p className="block text-center font-sans text-[13px] leading-[145%] tracking-[0.02em] m-0 opacity-[0.85] lg:hidden">
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
