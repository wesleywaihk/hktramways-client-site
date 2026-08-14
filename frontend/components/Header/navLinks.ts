export type NavLink = {
  label: string;
  href: string;
  external?: boolean;
  hasChevron?: boolean;
  children?: NavLink[];
};

// Desktop bar: subset of links shown inline (see Figma "00-Nav" frame)
export const desktopNavLinks: NavLink[] = [
  { label: "Plan Your Ride", href: "/plan-your-ride" },
  { label: "Tram Tour", href: "/tram-tour" },
  { label: "Party Tram", href: "/party-tram" },
  { label: "Store", href: "/store" },
  { label: "Careers", href: "/careers", external: true },
  { label: "About Us", href: "/about-us" },
];

// Mobile / slide-in overlay: full nav list
export const mobileNavLinks: NavLink[] = [
  { label: "Plan Your Ride", href: "/plan-your-ride" },
  {
    label: "Tram Tour",
    href: "/tram-tour",
    hasChevron: true,
    children: [
      { label: "Tram Tour", href: "/tram-tour" },
      { label: "TramOramic Tour", href: "/tram-tour/tramoramic-tour" },
      {
        label: "Ding Ding Qipao Pass",
        href: "/tram-tour/ding-ding-qipao-pass",
      },
      {
        label: "Restaurant Tram by Food Studio",
        href: "/tram-tour/restaurant-tram",
      },
    ],
  },
  { label: "Party Tram", href: "/party-tram" },
  { label: "Store", href: "/store" },
  { label: "Explore The Track", href: "/explore-the-track" },
  { label: "Careers", href: "/careers", external: true },
  {
    label: "About Us",
    href: "/about-us",
    hasChevron: true,
    children: [
      { label: "About Us", href: "/about-us" },
      { label: "Our Story", href: "/about-us/our-story" },
      { label: "News & Events", href: "/about-us/news-events" },
      { label: "Mobile App", href: "/about-us/mobile-app" },
      { label: "Contact Us", href: "/about-us/contact-us" },
    ],
  },
  { label: "Tram Advertising", href: "/tram-advertising" },
];
