export interface ImageFormat {
  url: string;
  width: number;
  height: number;
  size: number;
}

export interface Media {
  id: number;
  url: string;
  width: number;
  height: number;
  alternativeText: string | null;
  formats: Record<string, ImageFormat> | null;
  mime: string;
}

export interface ResponsiveImage {
  id: number;
  altText: string | null;
  imageD: Media | null;
  imageM: Media | null;
}

export interface Hyperlink {
  id: number;
  url: string | null;
  openNewWindow: boolean | null;
  noRefer: boolean | null;
}

export interface HomeNewsBarItem {
  id: number;
  dateTime: string;
  type: string;
  text: string;
  hyperlink: Hyperlink | null;
}

export interface CarouselItem {
  image: Media | null;
  desc: string | null;
  hyperlink: Hyperlink | null;
}

export interface ArcCarouselItem {
  id: number;
  carouselItem: CarouselItem | null;
  callActionText: string | null;
}

export type IconEnum = "map" | "calendar" | "busket" | "upRightArrow" | "faq";

export interface IconComponent {
  id: number;
  icon: IconEnum | null;
}

export interface ActionButton {
  id: number;
  label: string | null;
  link: Hyperlink | null;
  startIcon: IconComponent | null;
  useArrow: boolean | null;
}

export interface ArcCarouselData {
  id: number;
  title: string | null;
  item: ArcCarouselItem[];
  actionButton: ActionButton | null;
}

export interface TramRouteData {
  id: number;
  title: string | null;
  desc: string | null;
  actionButton: ActionButton | null;
}

export interface TramoramicTourItem {
  id: number;
  hashTag: string | null;
  image: Media | null;
}

export interface TramoramicTourData {
  id: number;
  tramoramicTourItem1: TramoramicTourItem | null;
  tramoramicTourItem2: TramoramicTourItem | null;
  tramoramicTourItem3: TramoramicTourItem | null;
  title1: string | null;
  title2: string | null;
  desc: string | null;
  action1: ActionButton | null;
  action2: ActionButton | null;
}
export interface SouveniorItem {
  id: number;
  image: Media | null;
  icon: IconComponent | null;
  link: Hyperlink | null;
  name: string;
  pirce: number;
  preDiscountPrice: number | null;
}

export interface SouveniorData {
  id: number;
  title: string;
  actionButton: ActionButton | null;
  item: SouveniorItem[];
}

export interface DownloadAppAreaData {
  id: number;
  Image: Media | null;
  title: string;
  desc: string;
  actionButton1: ActionButton | null;
  actionButton2: ActionButton | null;
}

export interface TramDetailsItem {
  id: number;
  title: string;
}

export interface PartyTramItem {
  id: number;
  carouselItem: CarouselItem | null;
  callActionNumber: number | null;
  callActionText: string | null;
  tramDetailsItem: TramDetailsItem | null;
}

export interface PartyTramData {
  id: number;
  documentId: string;
  title: string;
  item: PartyTramItem[];
}

export interface PartyTramResponse {
  data: PartyTramData | null;
}

export interface Home {
  id: number;
  documentId: string;
  Title: string;
  bannerImage: ResponsiveImage[] | null;
  newsBar: HomeNewsBarItem[];
}

export interface HomeResponse {
  data: Home[];
}

export interface HomeArcCarouselResponse {
  data: { arcCarousel: ArcCarouselData | null }[];
}

export interface HomeDownloadAppAreaResponse {
  data: { downloadAppArea: DownloadAppAreaData | null }[];
}

export interface HomeSouveniorResponse {
  data: { souvenior: SouveniorData | null }[];
}

export interface HomeTramoramicTourResponse {
  data: { tramoramicTour: TramoramicTourData | null }[];
}

export interface TramRouteResponse {
  data: TramRouteData | null;
}

export interface ScheduleBasicUnit {
  monToFri: string;
  sat: string;
  sun: string;
}

export interface ScheduleDay {
  first: ScheduleBasicUnit;
  last: ScheduleBasicUnit;
}

export interface ScheduleWestBound {
  shauKeiWan_westernMarket: ScheduleDay;
  shauKeiWan_happyValley: ScheduleDay;
  northPoint_shekTongTsui: ScheduleDay;
  causewayBay_shekTongTsui: ScheduleDay;
  happyValley_kennedyTown: ScheduleDay;
  shauKeiWan_kennedyTown: ScheduleDay;
}

export interface ScheduleEastBound {
  westernMarket_shauKeiWan: ScheduleDay;
  happyValley_shauKeiWan: ScheduleDay;
  shekTongTsui_northPoint: ScheduleDay;
  shekTongTsui_causewayBay: ScheduleDay;
  kennedyTown_happyValley: ScheduleDay;
  kennedyTown_shauKeiWan: ScheduleDay;
}

export interface ScheduleData {
  ScheduleWestBound: ScheduleWestBound;
  // NOTE: "sehedule" (missing the "d") matches a typo in the backend schema field name.
  seheduleEastBound: ScheduleEastBound;
}

export interface PlanYourRideData {
  id: number;
  documentId: string;
  title: string;
  desc: string;
  actionButton: ActionButton | null;
  bannerImage: ResponsiveImage[] | null;
  downloadAppArea: DownloadAppAreaData | null;
}

export interface PlanYourRideResponse {
  data: PlanYourRideData[];
}

export interface PlanYourRideScheduleResponse {
  data: { schedule: ScheduleData | null }[];
}

export interface PlanYourRideInteractiveRouteMapResponse {
  data: { interactiveRouteMap: DownloadAppAreaData | null }[];
}

export interface GlobalFaviconFormat {
  url: string;
  width: number;
  height: number;
  size: number;
}

export interface GlobalFavicon {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
  formats: Record<string, GlobalFaviconFormat> | null;
  mime: string;
}

export interface GlobalSeo {
  id: number;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  metaRobots: string | null;
  structuredData: unknown | null;
}

export interface GlobalGetInTouch {
  id: number;
  title: string;
  desc: string;
  ButtonLabel: string;
}

export interface GlobalFooter {
  id: number;
  faresPaymentUrl: string | null;
  adultPrice: number | null;
  childPrice: number | null;
  seniorPrice: number | null;
  monthlyTicket: number | null;
  googlePlayLink: string | null;
  appStoreLink: string | null;
  getInTouch: GlobalGetInTouch | null;
  desc: string;
  fbLink: string | null;
  igLink: string | null;
  youtubeLink: string | null;
  redBookLink: string | null;
  weChatLink: string | null;
  weiBoLink: string | null;
  tripAdvLink: string | null;
  tncLink: string | null;
}

export interface GlobalData {
  id: number;
  documentId: string;
  locale: string;
  favicon: GlobalFavicon | null;
  seo: GlobalSeo | null;
  footer: GlobalFooter | null;
}

export interface GlobalResponse {
  data: GlobalData;
}
