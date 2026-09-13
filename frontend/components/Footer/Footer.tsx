import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import Button from "@/components/Button/Button";
import ChevronIcon from "@/components/icons/ChevronIcon";
import { devClassName } from "@/lib/devClassName";
import type { GlobalFooter } from "@/types/api";
import { socialPlatforms } from "./footerData";
import Logo from "./Logo";

const columnHeading =
  "font-sans text-[clamp(1.05rem,1.4583333333vw,1.96875rem)] leading-[1.52] font-semibold tracking-[0.0625rem] m-0 mb-[clamp(0.25rem,0.3472222222vw,0.46875rem)]";

const commonText = "paragraph text-[clamp(0.8rem,1.1111111111vw,1.5rem)]";

function formatPrice(price: number) {
  return Number.isInteger(price) ? String(price) : price.toFixed(2);
}

export interface FooterProps {
  data?: GlobalFooter | null;
}

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
    <footer
      className={`${devClassName("footer")}bg-green pageBorder flex flex-col items-start gap-[clamp(1.575rem,7.1246819338vw,2.1rem)] pb-[clamp(2rem,2.7777777778vw,3.75rem)] text-white xl:flex-row xl:gap-[clamp(4rem,5.5555555556vw,7.5rem)]`}
    >
      {/* Logo column */}
      <Logo className="order-1 w-full xl:flex xl:hidden" />

      {/* Fares & Payment Methods column */}
      <div className="gsp-[clamp(0.5rem,0.6944444444vw,0.9375rem)] order-2 flex w-full flex-col xl:order-4 xl:w-auto xl:flex-none">
        <h3 className={columnHeading}>
          <Link
            href={data.faresPaymentUrl ?? "#"}
            className="flex w-full items-center justify-between gap-1.5 hover:opacity-80"
          >
            {t("footerFaresPaymentMethods")}
            <ChevronIcon desktop className="h-5 w-5 shrink-0" />
          </Link>
        </h3>
        <ul className="m-0 flex list-none flex-col divide-y-2 divide-white/15 p-0">
          {fares.map((fare) => (
            <li
              key={fare.label}
              className={`flex items-center justify-between py-2.5 first:pt-0 ${commonText}`}
            >
              <span>{fare.label}</span>
              <span>HK${formatPrice(fare.value)}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Download App + Get in Touch sit side by side on mobile; `xl:contents` dissolves this wrapper on desktop so both columns take their own place in the row via `xl:order` */}
      <div className="order-3 flex w-full gap-x-[clamp(4rem,5.5555555556vw,7.5rem)] xl:order-2 xl:w-auto">
        {/* Download App column */}
        <div className="flex w-[50%] flex-col gap-[clamp(0.75rem,1.0416666667vw,1.40625rem)] xl:w-auto xl:flex-none">
          <h3 className={columnHeading}>{t("footerDownloadApp")}</h3>
          <div className="flex w-[66%] min-w-[140px] flex-col gap-[15px] xl:w-[185px]">
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
                  className="h-auto w-[140px]"
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
                  className="h-auto w-[140px]"
                />
              </a>
            )}
          </div>
        </div>

        {/* Get in Touch column */}
        {data.getInTouch && (
          <div className="order-4 flex w-[50%] flex-col items-start xl:order-3 xl:w-auto xl:max-w-[12.84vw] xl:flex-none">
            <h3 className={columnHeading}>{data.getInTouch.title}</h3>
            <p
              className={`m-0 mb-[15px] font-normal whitespace-pre-line xl:mb-5 ${commonText}`}
            >
              {data.getInTouch.desc}
            </p>
            <Button href="/contact-us" color="white" className="xl:px-7!">
              {data.getInTouch.ButtonLabel}
            </Button>
          </div>
        )}
      </div>

      {/* Copyright, disclaimer, social icons — reordered per breakpoint via `order`, repositioned under the logo column at desktop via col/row-start */}
      <div className="items-centerorder-5 order-4 flex w-full grow flex-col items-center xl:order-1 xl:w-[355px] xl:items-start">
        <Logo className="hidden xl:flex" />
        <p className="order-1 m-0 mb-[clamp(0.9rem,1.25vw,1.6875rem)] text-center text-[clamp(0.73125rem,3.3078880407vw,0.975rem)]! whitespace-pre-line opacity-[0.85] xl:order-2 xl:text-left">
          {data.desc}
        </p>
        <Link
          href={data.tncLink ?? "#"}
          className="order-2 text-center text-[clamp(0.73125rem,3.3078880407vw,0.975rem)]! hover:underline hover:opacity-80 xl:order-3 xl:text-left"
        >
          {t("navDisclaimerPrivacy")}
        </Link>
        <div className="order-3 mt-[25px] flex items-center gap-2.5">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className="flex h-8 w-8 items-center justify-center rounded-full hover:opacity-80 xl:rounded-[21px] xl:p-0.5"
            >
              <Image
                src={social.icon}
                alt=""
                width={32}
                height={32}
                aria-hidden="true"
              />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
