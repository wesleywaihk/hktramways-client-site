export type NavLink = {
  label: string;
  href: string;
  external?: boolean;
  hasChevron?: boolean;
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
  { label: "Tram Tour", href: "/tram-tour", hasChevron: true },
  { label: "Party Tram", href: "/party-tram" },
  { label: "Store", href: "/store" },
  { label: "Explore The Track", href: "/explore-the-track" },
  { label: "Careers", href: "/careers", external: true },
  { label: "About Us", href: "/about-us", hasChevron: true },
  { label: "Tram Advertising", href: "/tram-advertising" },
];
