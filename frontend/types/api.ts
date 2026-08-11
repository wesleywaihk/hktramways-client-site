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

export interface ArcCarouselItem {
  id: number;
  image: Media | null;
  desc: string | null;
  hyperlink: Hyperlink | null;
  callActionText: string | null;
}

export type IconEnum = "map" | "calendar" | "busket" | "upRightArrow";

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

export interface Home {
  id: number;
  documentId: string;
  Title: string;
  bannerImage: ResponsiveImage[] | null;
  newsBar: HomeNewsBarItem[];
  arcCarousel: ArcCarouselData | null;
  tramRoute: TramRouteData | null;
  tramoramicTour: TramoramicTourData | null;
  souvenior: SouveniorData | null;
}

export interface HomeResponse {
  data: Home[];
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

export interface GlobalData {
  id: number;
  documentId: string;
  locale: string;
  favicon: GlobalFavicon | null;
  seo: GlobalSeo | null;
}

export interface GlobalResponse {
  data: GlobalData;
}
