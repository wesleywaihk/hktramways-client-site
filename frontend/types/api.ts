export interface HomeBannerFormat {
  url: string;
  width: number;
  height: number;
  size: number;
}

export interface HomeBanner {
  id: number;
  url: string;
  width: number;
  height: number;
  alternativeText: string | null;
  formats: Record<string, HomeBannerFormat> | null;
}

export interface HomeBannerImage {
  id: number;
  altText: string | null;
  bannerD: HomeBanner | null;
  bannerM: HomeBanner | null;
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

export interface ArcCarouselImageFormat {
  url: string;
  width: number;
  height: number;
  size: number;
}

export interface ArcCarouselImage {
  id: number;
  url: string;
  width: number;
  height: number;
  alternativeText: string | null;
  formats: Record<string, ArcCarouselImageFormat> | null;
}

export interface ArcCarouselItem {
  id: number;
  image: ArcCarouselImage | null;
  desc: string | null;
  hyperlink: Hyperlink | null;
}

export interface ArcCarouselActionButton {
  id: number;
  label: string | null;
  link: Hyperlink[];
}

export interface ArcCarouselData {
  id: number;
  title: string | null;
  item: ArcCarouselItem[];
  actionButton: ArcCarouselActionButton | null;
}

export interface TramRouteMapButton {
  id: number;
  label: string | null;
  link: Hyperlink[];
}

export interface TramRouteData {
  id: number;
  title: string | null;
  desc: string | null;
  mapButton: TramRouteMapButton | null;
}

export interface Home {
  id: number;
  documentId: string;
  Title: string;
  bannerImage: HomeBannerImage | null;
  newsBar: HomeNewsBarItem[];
  arcCarousel: ArcCarouselData | null;
  tramRoute: TramRouteData | null;
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
  seo: GlobalSeo[];
}

export interface GlobalResponse {
  data: GlobalData;
}
