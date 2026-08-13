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
    startIcon: Schema.Attribute.Component<'shared.icon-enum', false>;
    useArrow: Schema.Attribute.Boolean;
  };
}

export interface ContentArcCarouselItem extends Struct.ComponentSchema {
  collectionName: 'components_content_arc_carousel_items';
  info: {
    displayName: 'ArcCarouselItem';
  };
  attributes: {
    callActionText: Schema.Attribute.String;
    carouselItem: Schema.Attribute.Component<'content.carousel-item', false>;
  };
}

export interface ContentBannerImageUnit extends Struct.ComponentSchema {
  collectionName: 'components_content_banner_image_units';
  info: {
    displayName: 'bannerImageUnit';
  };
  attributes: {
    altText: Schema.Attribute.String;
    imageD: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Schema.Attribute.Required;
    imageM: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Schema.Attribute.Required;
  };
}

export interface ContentCarouselItem extends Struct.ComponentSchema {
  collectionName: 'components_content_carousel_items';
  info: {
    displayName: 'carouselItem';
    icon: 'code';
  };
  attributes: {
    desc: Schema.Attribute.Text;
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

export interface ContentIconList extends Struct.ComponentSchema {
  collectionName: 'components_content_icon_lists';
  info: {
    displayName: 'iconList';
    icon: 'code';
  };
  attributes: {
    icon: Schema.Attribute.Enumeration<
      ['map', 'calendar', 'busket', 'upRightArrow']
    >;
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

export interface ContentPartyTramItem extends Struct.ComponentSchema {
  collectionName: 'components_content_party_tram_items';
  info: {
    displayName: 'partyTramItem';
  };
  attributes: {
    carouselItem: Schema.Attribute.Component<'content.carousel-item', false>;
    tramDetailsItem: Schema.Attribute.Component<
      'content.tram-details-item',
      false
    >;
  };
}

export interface ContentSouveniorItem extends Struct.ComponentSchema {
  collectionName: 'components_content_souvenior_items';
  info: {
    displayName: 'souveniorItem';
    icon: 'gift';
  };
  attributes: {
    icon: Schema.Attribute.Component<'shared.icon-enum', false>;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Schema.Attribute.Required;
    link: Schema.Attribute.Component<'content.hyperlink', false>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    pirce: Schema.Attribute.Decimal & Schema.Attribute.Required;
    preDiscountPrice: Schema.Attribute.Decimal;
  };
}

export interface ContentTramDetailsItem extends Struct.ComponentSchema {
  collectionName: 'components_content_tram_details_items';
  info: {
    displayName: 'tramDetailsItem';
  };
  attributes: {
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ContentTramoramicTourItem extends Struct.ComponentSchema {
  collectionName: 'components_content_tramoramic_tour_items';
  info: {
    displayName: 'tramoramicTourItem';
  };
  attributes: {
    hashTag: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
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
    item: Schema.Attribute.Component<'content.arc-carousel-item', true>;
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
    actionButton: Schema.Attribute.Component<'content.action-button', false>;
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
    title1: Schema.Attribute.String;
    title2: Schema.Attribute.String;
    tramoramicTourItem1: Schema.Attribute.Component<
      'content.tramoramic-tour-item',
      false
    >;
    tramoramicTourItem2: Schema.Attribute.Component<
      'content.tramoramic-tour-item',
      false
    >;
    tramoramicTourItem3: Schema.Attribute.Component<
      'content.tramoramic-tour-item',
      false
    >;
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

export interface SharedIconEnum extends Struct.ComponentSchema {
  collectionName: 'components_shared_icon_enums';
  info: {
    displayName: 'icon-enum';
    icon: 'bulletList';
  };
  attributes: {
    icon: Schema.Attribute.Enumeration<
      ['map', 'calendar', 'busket', 'upRightArrow']
    >;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'content.action-button': ContentActionButton;
      'content.arc-carousel-item': ContentArcCarouselItem;
      'content.banner-image-unit': ContentBannerImageUnit;
      'content.carousel-item': ContentCarouselItem;
      'content.hyperlink': ContentHyperlink;
      'content.icon-list': ContentIconList;
      'content.news-items': ContentNewsItems;
      'content.party-tram-item': ContentPartyTramItem;
      'content.souvenior-item': ContentSouveniorItem;
      'content.tram-details-item': ContentTramDetailsItem;
      'content.tramoramic-tour-item': ContentTramoramicTourItem;
      'media.banner-image': MediaBannerImage;
      'page-home.arc-carousel': PageHomeArcCarousel;
      'page-home.souvenior': PageHomeSouvenior;
      'page-home.tram-routes': PageHomeTramRoutes;
      'page-home.tramoramic-tour': PageHomeTramoramicTour;
      'seo.seo': SeoSeo;
      'shared.icon-enum': SharedIconEnum;
    }
  }
}
