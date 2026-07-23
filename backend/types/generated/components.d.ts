import type { Schema, Struct } from '@strapi/strapi';

export interface ContentNewsItems extends Struct.ComponentSchema {
  collectionName: 'components_content_news_items';
  info: {
    displayName: 'newsItems';
    icon: 'television';
  };
  attributes: {
    dateTime: Schema.Attribute.DateTime & Schema.Attribute.Required;
    isExternal: Schema.Attribute.Boolean;
    text: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
    type: Schema.Attribute.Enumeration<['event', 'discount', 'news']> &
      Schema.Attribute.Required;
    url: Schema.Attribute.String;
  };
}

export interface MediaBannerImage extends Struct.ComponentSchema {
  collectionName: 'components_media_banner_images';
  info: {
    displayName: 'Banner Image';
    icon: 'picture';
  };
  attributes: {
    altText: Schema.Attribute.String;
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
      'content.news-items': ContentNewsItems;
      'media.banner-image': MediaBannerImage;
      'seo.seo': SeoSeo;
    }
  }
}
