export type NavLink = {
  labelKey: string;
  href: string;
  external?: boolean;
  hasChevron?: boolean;
  children?: NavLink[];
};

// Desktop bar: subset of links shown inline (see Figma "00-Nav" frame)
// `labelKey` values are keys in the "common" i18n namespace.
export const desktopNavLinks: NavLink[] = [
  { labelKey: "navPlanYourRide", href: "/plan-your-ride" },
  { labelKey: "navTramTour", href: "/tram-tour" },
  { labelKey: "navPartyTram", href: "/party-tram" },
  { labelKey: "navStore", href: "/store" },
  { labelKey: "navCareers", href: "/careers", external: true },
  { labelKey: "navAboutUs", href: "/about-us" },
];

// Mobile / slide-in overlay: full nav list
export const mobileNavLinks: NavLink[] = [
  { labelKey: "navPlanYourRide", href: "/plan-your-ride" },
  {
    labelKey: "navTramTour",
    href: "/tram-tour",
    hasChevron: true,
    children: [
      { labelKey: "navTramTour", href: "/tram-tour" },
      { labelKey: "navTramoramicTour", href: "/tram-tour/tramoramic-tour" },
      {
        labelKey: "navDingDingQipaoPass",
        href: "/tram-tour/ding-ding-qipao-pass",
      },
      {
        labelKey: "navRestaurantTram",
        href: "/tram-tour/restaurant-tram",
      },
    ],
  },
  { labelKey: "navPartyTram", href: "/party-tram" },
  { labelKey: "navStore", href: "/store" },
  { labelKey: "navExploreTheTrack", href: "/explore-the-track" },
  { labelKey: "navCareers", href: "/careers", external: true },
  {
    labelKey: "navAboutUs",
    href: "/about-us",
    hasChevron: true,
    children: [
      { labelKey: "navAboutUs", href: "/about-us" },
      { labelKey: "navOurStory", href: "/about-us/our-story" },
      { labelKey: "navNewsEvents", href: "/about-us/news-events" },
      { labelKey: "navMobileApp", href: "/about-us/mobile-app" },
      { labelKey: "navContactUs", href: "/about-us/contact-us" },
    ],
  },
  { labelKey: "navTramAdvertising", href: "/tram-advertising" },
];
