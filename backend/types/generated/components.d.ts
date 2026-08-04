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
    startIcon: Schema.Attribute.Enumeration<
      ['map', 'calendar', 'bucket', 'upRightArrow']
    >;
    useArrow: Schema.Attribute.Boolean;
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

export interface ContentSouveniorItem extends Struct.ComponentSchema {
  collectionName: 'components_content_souvenior_items';
  info: {
    displayName: 'souveniorItem';
    icon: 'gift';
  };
  attributes: {
    actionButton: Schema.Attribute.Component<'content.action-button', false>;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    order: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    pirce: Schema.Attribute.Decimal & Schema.Attribute.Required;
    preDiscountPrice: Schema.Attribute.Decimal;
    rank: Schema.Attribute.Enumeration<['r1', 'r2', 'r3']>;
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
    imageD: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    imageM: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
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

export interface PageHomeSouvenior extends Struct.ComponentSchema {
  collectionName: 'components_page_home_souveniors';
  info: {
    displayName: 'souvenior';
    icon: 'gift';
  };
  attributes: {
    item: Schema.Attribute.Component<'content.souvenior-item', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PageHomeTramRoutes extends Struct.ComponentSchema {
  collectionName: 'components_page_home_tram_routes';
  info: {
    displayName: 'tramRoutes';
    icon: 'code';
  };
  attributes: {
    actionButton: Schema.Attribute.Component<'content.action-button', false>;
    desc: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface PageHomeTramoramicTour extends Struct.ComponentSchema {
  collectionName: 'components_page_home_tramoramic_tours';
  info: {
    displayName: 'tramoramicTour';
    icon: 'code';
  };
  attributes: {
    action1: Schema.Attribute.Component<'content.action-button', false>;
    action2: Schema.Attribute.Component<'content.action-button', false>;
    desc: Schema.Attribute.Text;
    hashTagTxt: Schema.Attribute.String;
    mianImage: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    supportImage1: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    supportImage2: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    title1: Schema.Attribute.String;
    title2: Schema.Attribute.String;
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
      'content.souvenior-item': ContentSouveniorItem;
      'media.banner-image': MediaBannerImage;
      'page-home.arc-carousel': PageHomeArcCarousel;
      'page-home.souvenior': PageHomeSouvenior;
      'page-home.tram-routes': PageHomeTramRoutes;
      'page-home.tramoramic-tour': PageHomeTramoramicTour;
      'seo.seo': SeoSeo;
    }
  }
}
