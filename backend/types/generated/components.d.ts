import type { Schema, Struct } from '@strapi/strapi';

export interface ContentActionButton extends Struct.ComponentSchema {
  collectionName: 'components_content_action_buttons';
  info: {
    displayName: 'actionButton';
    icon: 'code';
  };
  attributes: {
    label: Schema.Attribute.String;
    link: Schema.Attribute.Component<'content.hyperlink', false>;
  };
}

export interface ContentCarouselItem extends Struct.ComponentSchema {
  collectionName: 'components_content_carousel_items';
  info: {
    displayName: 'carouselItem';
    icon: 'code';
  };
  attributes: {
    desc: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 80;
      }>;
    hyperlink: Schema.Attribute.Component<'content.hyperlink', false>;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface ContentHyperlink extends Struct.ComponentSchema {
  collectionName: 'components_content_hyperlinks';
  info: {
    displayName: 'hyperlink';
    icon: 'link';
  };
  attributes: {
    noRefer: Schema.Attribute.Boolean;
    openNewWindow: Schema.Attribute.Boolean;
    url: Schema.Attribute.String;
  };
}

export interface ContentNewsItems extends Struct.ComponentSchema {
  collectionName: 'components_content_news_items';
  info: {
    displayName: 'newsItems';
    icon: 'television';
  };
  attributes: {
    dateTime: Schema.Attribute.DateTime & Schema.Attribute.Required;
    hyperlink: Schema.Attribute.Component<'content.hyperlink', false>;
    text: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
    type: Schema.Attribute.Enumeration<['event', 'discount', 'news']> &
      Schema.Attribute.Required;
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

export interface PageHomeArcCarousel extends Struct.ComponentSchema {
  collectionName: 'components_page_home_arc_carousels';
  info: {
    displayName: 'ArcCarousel';
    icon: 'landscape';
  };
  attributes: {
    actionButton: Schema.Attribute.Component<'content.action-button', false>;
    item: Schema.Attribute.Component<'content.carousel-item', true>;
    title: Schema.Attribute.String;
  };
}

export interface PageHomeTramRoutes extends Struct.ComponentSchema {
  collectionName: 'components_page_home_tram_routes';
  info: {
    displayName: 'tramRoutes';
    icon: 'code';
  };
  attributes: {
    desc: Schema.Attribute.Text;
    mapButton: Schema.Attribute.Component<'content.action-button', false>;
    title: Schema.Attribute.String;
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
      'content.action-button': ContentActionButton;
      'content.carousel-item': ContentCarouselItem;
      'content.hyperlink': ContentHyperlink;
      'content.news-items': ContentNewsItems;
      'media.banner-image': MediaBannerImage;
      'page-home.arc-carousel': PageHomeArcCarousel;
      'page-home.tram-routes': PageHomeTramRoutes;
      'seo.seo': SeoSeo;
    }
  }
}
