export interface HomeBanner {
  id: number;
  url: string;
  alternativeText: string | null;
}

export interface HomeBannerImage {
  id: number;
  bannerD: HomeBanner | null;
  bannerM: HomeBanner | null;
}

export interface Home {
  id: number;
  documentId: string;
  Title: string;
  bannerImage: HomeBannerImage | null;
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
