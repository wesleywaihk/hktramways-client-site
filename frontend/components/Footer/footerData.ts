export type SocialLink = {
  name: string;
  icon: string;
  href: string;
};

export const socialLinks: SocialLink[] = [
  { name: "Facebook", icon: "/footer/fb.svg", href: "https://facebook.com" },
  { name: "Instagram", icon: "/footer/ig.svg", href: "https://instagram.com" },
  { name: "Youtube", icon: "/footer/yt.svg", href: "https://youtube.com" },
  { name: "Weibo", icon: "/footer/wb.svg", href: "https://weibo.com" },
  { name: "Tripadvisor", icon: "/footer/ta.svg", href: "https://tripadvisor.com" },
];

export type FareRow = {
  label: string;
  value: string;
};

export const fares: FareRow[] = [
  { label: "Adult", value: "HK$3.3" },
  { label: "Child", value: "HK$1.6" },
  { label: "Senior Citizen", value: "HK$1.5" },
  { label: "Monthly Ticket", value: "HK$260" },
];

export const paymentIcons = [
  "/footer/PayOctopus.svg",
  "/footer/PayCash.svg",
  "/footer/PayCard.svg",
  "/footer/PayMobile.svg",
  "/footer/PayQR.svg",
];
