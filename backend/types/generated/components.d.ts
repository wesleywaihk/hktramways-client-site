import type { Schema, Struct } from '@strapi/strapi';

export interface LayoutHeaderStyle extends Struct.ComponentSchema {
  collectionName: 'components_layout_header_styles';
  info: {
    displayName: 'headerStyle';
    icon: 'code';
  };
  attributes: {
    headerStyle: Schema.Attribute.Enumeration<
      ['default', 'transparent', 'white']
    > &
      Schema.Attribute.DefaultTo<'default'>;
  };
}

export interface MediaBannerImage extends Struct.ComponentSchema {
  collectionName: 'components_media_banner_images';
  info: {
    displayName: 'Banner Image';
    icon: 'picture';
  };
  attributes: {
    bannerD: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    bannerM: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface SeoSeo extends Struct.ComponentSchema {
  collectionName: 'components_seo_seos';
  info: {
    displayName: 'Seo';
  };
  attributes: {
    keywords: Schema.Attribute.Text & Schema.Attribute.Required;
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaRobots: Schema.Attribute.Enumeration<
      [
        'index, follow',
        'noindex, follow',
        'index, nofollow',
        'noindex, nofollow',
      ]
    >;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
    structuredData: Schema.Attribute.JSON;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'layout.header-style': LayoutHeaderStyle;
      'media.banner-image': MediaBannerImage;
      'seo.seo': SeoSeo;
    }
  }
}
