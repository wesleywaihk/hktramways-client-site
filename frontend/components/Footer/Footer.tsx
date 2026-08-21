import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import Button from "@/components/Button/Button";
import ChevronIcon from "@/components/Header/ChevronIcon";
import type { GlobalFooter } from "@/types/api";
import { socialPlatforms } from "./footerData";

const columnHeading =
  "font-sans text-[18px] leading-[152%] font-semibold tracking-[0.02em] m-0 mb-4 xl:text-[21px] xl:leading-[152%] xl:mb-5";

function formatPrice(price: number) {
  return Number.isInteger(price) ? String(price) : price.toFixed(2);
}

export interface FooterProps {
  data?: GlobalFooter | null;
}

const Logo = ({ className = "" }: { className?: string }) => (
  <div className={`col-span-2 flex flex-col ${className}`}>
    <div className="grid grid-cols-4 items-center xl:flex xl:justify-start xl:gap-4">
      <Image
        src="/logo-white.svg"
        alt="HK Tramways"
        width={200}
        height={60}
        className="col-span-2 h-auto w-full max-w-[260px] xl:h-[60px] xl:w-[200px]"
      />
      <Image
        src="/footer/caringCompany.png"
        alt="15+ Years Caring Company"
        width={124}
        height={55}
        className="col-span-1 col-start-4 h-auto w-full max-w-[200px] justify-self-end xl:w-[124px]"
      />
    </div>
  </div>
);

export default async function Footer({ data = undefined }: FooterProps) {
  if (!data) return null;

  const t = await getTranslations("common");

  const socialLinks = socialPlatforms(data);
  const fares = [
    data.adultPrice != null && {
      label: t("footerAdult"),
      value: data.adultPrice,
    },
    data.childPrice != null && {
      label: t("footerChild"),
      value: data.childPrice,
    },
    data.seniorPrice != null && {
      label: t("footerSeniorCitizen"),
      value: data.seniorPrice,
    },
    data.monthlyTicket != null && {
      label: t("footerMonthlyTicket"),
      value: data.monthlyTicket,
    },
  ].filter((fare): fare is { label: string; value: number } => !!fare);

  return (
    <footer className="bg-green pt-[60px] pb-[32px] text-white xl:pt-[80px] xl:pb-[50px]">
      <div className="pageBorder grid grid-cols-2 gap-x-5 gap-y-10 xl:flex xl:items-start xl:gap-[55px]">
        {/* Logo column */}

        <Logo className="xl:hidden" />

        {/* Fares & Payment Methods column */}
        <div className="col-span-2 flex flex-col xl:order-4 xl:flex-none">
          <h3 className={columnHeading}>
            <Link
              href={data.faresPaymentUrl ?? "#"}
              className="flex w-full items-center justify-between gap-1.5 hover:opacity-80"
            >
              {t("footerFaresPaymentMethods")}
              <ChevronIcon desktop className="h-4 w-4 shrink-0" />
            </Link>
          </h3>
          <ul className="m-0 flex list-none flex-col divide-y divide-white/15 p-0">
            {fares.map((fare) => (
              <li
                key={fare.label}
                className="flex items-center justify-between py-3.5 font-sans text-[15px] leading-[162.5%] tracking-[0.02em] first:pt-0 xl:py-2.5 xl:text-[16px] xl:leading-[163%]"
              >
                <span>{fare.label}</span>
                <span>HK${formatPrice(fare.value)}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Download App column */}
        <div className="xl:order-2 xl:flex-none">
          <h3 className={columnHeading}>{t("footerDownloadApp")}</h3>
          <div className="flex flex-col gap-[15px]">
            {data.googlePlayLink && (
              <a
                href={data.googlePlayLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/footer/googlePlay.png"
                  alt="Get it on Google Play"
                  width={140}
                  height={46}
                  className="h-auto w-full max-w-[180px]"
                />
              </a>
            )}
            {data.appStoreLink && (
              <a
                href={data.appStoreLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/footer/appStore.png"
                  alt="Download on the App Store"
                  width={140}
                  height={46}
                  className="h-auto w-full max-w-[180px]"
                />
              </a>
            )}
          </div>
        </div>

        {/* Get in Touch column */}
        {data.getInTouch && (
          <div className="flex flex-col items-start xl:order-3 xl:max-w-[220px] xl:flex-none">
            <h3 className={columnHeading}>{data.getInTouch.title}</h3>
            <p className="m-0 mb-6 font-sans text-[15px] leading-[162.5%] tracking-[0.02em] whitespace-pre-line xl:mb-7 xl:text-[16px] xl:leading-[163%]">
              {data.getInTouch.desc}
            </p>
            <Button
              href="/contact-us"
              color="white"
              useArrow
              className="xl:px-7!"
            >
              {data.getInTouch.ButtonLabel}
            </Button>
          </div>
        )}

        {/* Copyright, disclaimer, social icons — reordered per breakpoint via `order`, repositioned under the logo column at desktop via col/row-start */}
        <div className="col-span-2 flex flex-col items-center xl:order-1 xl:grow xl:items-start">
          <Logo className="hidden xl:flex" />
          <p className="order-1 m-0 text-center font-sans text-[13px] leading-[145%] tracking-[0.02em] whitespace-pre-line opacity-[0.85] xl:order-2 xl:mt-6 xl:text-left">
            {data.desc}
          </p>
          <Link
            href={data.tncLink ?? "#"}
            className="order-2 mt-3 font-sans text-[13px] leading-[145%] tracking-[0.02em] underline hover:opacity-80 xl:order-3 xl:mt-2"
          >
            {t("navDisclaimerPrivacy")}
          </Link>
          <div className="order-3 mt-11 flex items-center gap-2.5 xl:order-1 xl:mt-6">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="flex h-8 w-8 items-center justify-center rounded-full hover:opacity-80 xl:h-8 xl:w-[26px] xl:rounded-[21px] xl:p-0.5"
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
        </div>
      </div>
    </footer>
  );
}
