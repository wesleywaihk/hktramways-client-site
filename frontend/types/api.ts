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

export interface HomeNewsBarItem {
  id: number;
  dateTime: string;
  type: string;
  text: string;
  url: string | null;
  openNewWindow: boolean | null;
  noRefer: boolean | null;
}

export interface Home {
  id: number;
  documentId: string;
  Title: string;
  bannerImage: HomeBannerImage | null;
  newsBar: HomeNewsBarItem[];
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
