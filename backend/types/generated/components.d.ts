import type { Schema, Struct } from '@strapi/strapi';

export interface ContentActionButton extends Struct.ComponentSchema {
  collectionName: 'components_content_action_buttons';
  info: {
    displayName: 'Action Button';
    icon: 'code';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    link: Schema.Attribute.Component<'content.hyperlink', false>;
    startIcon: Schema.Attribute.Component<'shared.icon-enum', false>;
    useArrow: Schema.Attribute.Boolean;
  };
}

export interface ContentArcCarouselItem extends Struct.ComponentSchema {
  collectionName: 'components_content_arc_carousel_items';
  info: {
    displayName: 'Arc Carousel Item';
  };
  attributes: {
    callActionText: Schema.Attribute.String;
    carouselItem: Schema.Attribute.Component<'content.carousel-item', false>;
  };
}

export interface ContentAttraction extends Struct.ComponentSchema {
  collectionName: 'components_content_attractions';
  info: {
    displayName: 'Attraction';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images', true> & Schema.Attribute.Required;
    link: Schema.Attribute.String;
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ContentBannerImageUnit extends Struct.ComponentSchema {
  collectionName: 'components_content_banner_image_units';
  info: {
    displayName: 'Banner Image Unit';
  };
  attributes: {
    altText: Schema.Attribute.String;
    imageD: Schema.Attribute.Media<'images' | 'videos'> &
      Schema.Attribute.Required;
    imageM: Schema.Attribute.Media<'images' | 'videos'> &
      Schema.Attribute.Required;
  };
}

export interface ContentCarouselItem extends Struct.ComponentSchema {
  collectionName: 'components_content_carousel_items';
  info: {
    displayName: 'Carousel Item';
    icon: 'code';
  };
  attributes: {
    desc: Schema.Attribute.Text & Schema.Attribute.Required;
    hyperlink: Schema.Attribute.Component<'content.hyperlink', false>;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
  };
}

export interface ContentDownloadAppArea extends Struct.ComponentSchema {
  collectionName: 'components_content_download_app_areas';
  info: {
    displayName: 'Download App Area';
  };
  attributes: {
    actionButton1: Schema.Attribute.Component<'content.action-button', false> &
      Schema.Attribute.Required;
    actionButton2: Schema.Attribute.Component<'content.action-button', false>;
    bgColor: Schema.Attribute.String;
    desc: Schema.Attribute.Text & Schema.Attribute.Required;
    Image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ContentFareItem extends Struct.ComponentSchema {
  collectionName: 'components_content_fare_items';
  info: {
    displayName: 'Fare Item';
  };
  attributes: {
    desc: Schema.Attribute.RichText & Schema.Attribute.Required;
    icon: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    note: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ContentFooter extends Struct.ComponentSchema {
  collectionName: 'components_content_footers';
  info: {
    displayName: 'Footer';
  };
  attributes: {
    adultPrice: Schema.Attribute.Decimal;
    appStoreLink: Schema.Attribute.String;
    childPrice: Schema.Attribute.Decimal;
    desc: Schema.Attribute.Text & Schema.Attribute.Required;
    faresPaymentUrl: Schema.Attribute.String & Schema.Attribute.Required;
    fbLink: Schema.Attribute.String;
    getInTouch: Schema.Attribute.Component<'content.get-in-touch', false> &
      Schema.Attribute.Required;
    googlePlayLink: Schema.Attribute.String;
    igLink: Schema.Attribute.String;
    monthlyTicket: Schema.Attribute.Decimal;
    redBookLink: Schema.Attribute.String;
    seniorPrice: Schema.Attribute.Decimal;
    tncLink: Schema.Attribute.String & Schema.Attribute.Required;
    tripAdvLink: Schema.Attribute.String;
    weiBoLink: Schema.Attribute.String;
    youtubeLink: Schema.Attribute.String;
  };
}

export interface ContentGetInTouch extends Struct.ComponentSchema {
  collectionName: 'components_content_get_in_touches';
  info: {
    displayName: 'Get In Touch';
  };
  attributes: {
    ButtonLabel: Schema.Attribute.String & Schema.Attribute.Required;
    desc: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ContentHyperlink extends Struct.ComponentSchema {
  collectionName: 'components_content_hyperlinks';
  info: {
    displayName: 'Hyperlink';
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
    displayName: 'Icon List';
    icon: 'code';
  };
  attributes: {
    icon: Schema.Attribute.Enumeration<
      ['map', 'calendar', 'busket', 'upRightArrow']
    >;
  };
}

export interface ContentImageLink extends Struct.ComponentSchema {
  collectionName: 'components_content_image_links';
  info: {
    displayName: 'Image Link';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    link: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ContentPartyTramItem extends Struct.ComponentSchema {
  collectionName: 'components_content_party_tram_items';
  info: {
    displayName: 'Party Tram Item';
  };
  attributes: {
    callActionNumber: Schema.Attribute.Integer;
    callActionText: Schema.Attribute.String;
    carouselItem: Schema.Attribute.Component<'content.carousel-item', false>;
    overlayH: Schema.Attribute.Decimal;
    overlayImg: Schema.Attribute.Media<'images'>;
    overlayW: Schema.Attribute.Decimal;
    overlayX: Schema.Attribute.Decimal;
    overlayY: Schema.Attribute.Decimal;
    tramDetailsItem: Schema.Attribute.Component<
      'content.tram-details-item',
      false
    >;
  };
}

export interface ContentScheduleBasicUnit extends Struct.ComponentSchema {
  collectionName: 'components_content_schedule_basic_units';
  info: {
    displayName: 'Schedule Basic Unit';
  };
  attributes: {
    monToFri: Schema.Attribute.Time & Schema.Attribute.Required;
    sat: Schema.Attribute.Time & Schema.Attribute.Required;
    sun: Schema.Attribute.Time & Schema.Attribute.Required;
  };
}

export interface ContentScheduleDay extends Struct.ComponentSchema {
  collectionName: 'components_content_schedule_days';
  info: {
    displayName: 'Schedule Day';
  };
  attributes: {
    first: Schema.Attribute.Component<'content.schedule-basic-unit', false> &
      Schema.Attribute.Required;
    last: Schema.Attribute.Component<'content.schedule-basic-unit', false> &
      Schema.Attribute.Required;
  };
}

export interface ContentScheduleEastBound extends Struct.ComponentSchema {
  collectionName: 'components_content_schedule_east_bounds';
  info: {
    displayName: 'Schedule East Bound';
  };
  attributes: {
    happyValley_shauKeiWan: Schema.Attribute.Component<
      'content.schedule-day',
      false
    > &
      Schema.Attribute.Required;
    kennedyTown_happyValley: Schema.Attribute.Component<
      'content.schedule-day',
      false
    > &
      Schema.Attribute.Required;
    kennedyTown_shauKeiWan: Schema.Attribute.Component<
      'content.schedule-day',
      false
    > &
      Schema.Attribute.Required;
    shekTongTsui_causewayBay: Schema.Attribute.Component<
      'content.schedule-day',
      false
    > &
      Schema.Attribute.Required;
    shekTongTsui_northPoint: Schema.Attribute.Component<
      'content.schedule-day',
      false
    > &
      Schema.Attribute.Required;
    westernMarket_shauKeiWan: Schema.Attribute.Component<
      'content.schedule-day',
      false
    > &
      Schema.Attribute.Required;
  };
}

export interface ContentScheduleWestbound extends Struct.ComponentSchema {
  collectionName: 'components_content_schedule_westbounds';
  info: {
    displayName: 'Schedule West Bound';
  };
  attributes: {
    causewayBay_shekTongTsui: Schema.Attribute.Component<
      'content.schedule-day',
      false
    > &
      Schema.Attribute.Required;
    happyValley_kennedyTown: Schema.Attribute.Component<
      'content.schedule-day',
      false
    > &
      Schema.Attribute.Required;
    northPoint_shekTongTsui: Schema.Attribute.Component<
      'content.schedule-day',
      false
    > &
      Schema.Attribute.Required;
    shauKeiWan_happyValley: Schema.Attribute.Component<
      'content.schedule-day',
      false
    > &
      Schema.Attribute.Required;
    shauKeiWan_kennedyTown: Schema.Attribute.Component<
      'content.schedule-day',
      false
    > &
      Schema.Attribute.Required;
    shauKeiWan_westernMarket: Schema.Attribute.Component<
      'content.schedule-day',
      false
    > &
      Schema.Attribute.Required;
  };
}

export interface ContentServiceUpdates extends Struct.ComponentSchema {
  collectionName: 'components_content_service_updates';
  info: {
    displayName: 'Latest News';
  };
  attributes: {
    actionButton: Schema.Attribute.Component<'content.action-button', false> &
      Schema.Attribute.Required;
    announcement_types: Schema.Attribute.Relation<
      'oneToMany',
      'api::announcement-type.announcement-type'
    > &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ContentSouveniorItem extends Struct.ComponentSchema {
  collectionName: 'components_content_souvenior_items';
  info: {
    displayName: 'Souvenior Item';
    icon: 'gift';
  };
  attributes: {
    icon: Schema.Attribute.Component<'shared.icon-enum', false> &
      Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    link: Schema.Attribute.Component<'content.hyperlink', false>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    pirce: Schema.Attribute.Decimal & Schema.Attribute.Required;
    preDiscountPrice: Schema.Attribute.Decimal;
  };
}

export interface ContentStationItem extends Struct.ComponentSchema {
  collectionName: 'components_content_station_items';
  info: {
    displayName: 'Station Item';
  };
  attributes: {
    attraction: Schema.Attribute.Component<'content.attraction', true>;
    bannerLink: Schema.Attribute.Component<'content.image-link', false>;
    image: Schema.Attribute.Media<'images'>;
    locCode: Schema.Attribute.Enumeration<
      [
        '01E',
        '02W',
        '03E',
        '04W',
        '05E',
        '06W',
        '07E',
        '08W',
        '09E',
        '100W',
        '101E',
        '102W',
        '104W',
        '105',
        '106',
        '107',
        '108',
        '109',
        '10W',
        '110',
        '111',
        '112',
        '11E',
        '12W',
        '13E',
        '14W',
        '15E',
        '16W',
        '17E',
        '18W',
        '19E',
        '20W',
        '21E',
        '22W',
        '23E',
        '24W',
        '25E',
        '26W',
        '27E',
        '28W',
        '29E',
        '30W',
        '31E',
        '32W',
        '33E',
        '34W',
        '35E',
        '36W',
        '37E',
        '38W',
        '39E',
        '40W',
        '41E',
        '42W',
        '43E',
        '44W',
        '45E',
        '46W',
        '47E',
        '48W',
        '49E',
        '50W',
        '51E',
        '52W',
        '53E',
        '54W',
        '55E',
        '56W',
        '57E',
        '58W',
        '59E',
        '60W',
        '61E',
        '62W',
        '63E',
        '64W',
        '65E',
        '66W',
        '67E',
        '68W',
        '69E',
        '70W',
        '71E',
        '72W',
        '73E',
        '74W',
        '75E',
        '76W',
        '77E',
        '78W',
        '79E',
        '80W',
        '81E',
        '82W',
        '83E',
        '84W',
        '85E',
        '86W',
        '87E',
        '88W',
        '89E',
        '90W',
        '91E',
        '92W',
        '93E',
        '94W',
        '95E',
        '96W',
        '97E',
        '98W',
        '99E',
        'CBT',
        'EAD',
        'ECT',
        'ED',
        'EQB',
        'ETH',
        'EWC',
        'EWH',
        'HVT',
        'KTT',
        'NPT',
        'SKT',
        'TCB',
        'THV',
        'TKT',
        'TKW',
        'TNP',
        'TTT',
        'TWM',
        'WAD',
        'WCT',
        'WD',
        'WM',
        'WMT',
        'WQB',
        'WST',
        'WTH',
        'WWC',
        'WWH',
      ]
    > &
      Schema.Attribute.Required;
  };
}

export interface ContentTramDetailsItem extends Struct.ComponentSchema {
  collectionName: 'components_content_tram_details_items';
  info: {
    displayName: 'Tram Details Item';
  };
  attributes: {
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ContentTramoramicTourItem extends Struct.ComponentSchema {
  collectionName: 'components_content_tramoramic_tour_items';
  info: {
    displayName: 'Tramoramic Tour Item';
  };
  attributes: {
    hashTag: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
  };
}

export interface GlobalExtLink extends Struct.ComponentSchema {
  collectionName: 'components_global_ext_links';
  info: {
    displayName: 'Ext. Link';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    link: Schema.Attribute.Component<'content.hyperlink', false> &
      Schema.Attribute.Required;
  };
}

export interface GlobalMainNavExtLink extends Struct.ComponentSchema {
  collectionName: 'components_global_main_nav_ext_links';
  info: {
    displayName: 'Main Nav Ext. Link';
  };
  attributes: {
    careersLink: Schema.Attribute.String;
    extLink1: Schema.Attribute.Component<'global.ext-link', false>;
    extLink2: Schema.Attribute.Component<'global.ext-link', false>;
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
    imageD: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
    imageM: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface PageHomeArcCarousel extends Struct.ComponentSchema {
  collectionName: 'components_page_home_arc_carousels';
  info: {
    displayName: 'Arc Carousel';
    icon: 'landscape';
  };
  attributes: {
    actionButton: Schema.Attribute.Component<'content.action-button', false> &
      Schema.Attribute.Required;
    item: Schema.Attribute.Component<'content.arc-carousel-item', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PageHomeSouvenior extends Struct.ComponentSchema {
  collectionName: 'components_page_home_souveniors';
  info: {
    displayName: 'Souvenior';
    icon: 'gift';
  };
  attributes: {
    actionButton: Schema.Attribute.Component<'content.action-button', false> &
      Schema.Attribute.Required;
    item: Schema.Attribute.Component<'content.souvenior-item', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PageHomeTramRoutes extends Struct.ComponentSchema {
  collectionName: 'components_page_home_tram_routes';
  info: {
    displayName: 'Tram Routes';
    icon: 'code';
  };
  attributes: {
    actionButton: Schema.Attribute.Component<'content.action-button', false> &
      Schema.Attribute.Required;
    desc: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PageHomeTramoramicTour extends Struct.ComponentSchema {
  collectionName: 'components_page_home_tramoramic_tours';
  info: {
    displayName: 'Tramoramic Tour';
    icon: 'code';
  };
  attributes: {
    action1: Schema.Attribute.Component<'content.action-button', false> &
      Schema.Attribute.Required;
    action2: Schema.Attribute.Component<'content.action-button', false>;
    desc: Schema.Attribute.Text & Schema.Attribute.Required;
    title1: Schema.Attribute.String & Schema.Attribute.Required;
    title2: Schema.Attribute.String & Schema.Attribute.Required;
    tramoramicTourItem1: Schema.Attribute.Component<
      'content.tramoramic-tour-item',
      false
    > &
      Schema.Attribute.Required;
    tramoramicTourItem2: Schema.Attribute.Component<
      'content.tramoramic-tour-item',
      false
    > &
      Schema.Attribute.Required;
    tramoramicTourItem3: Schema.Attribute.Component<
      'content.tramoramic-tour-item',
      false
    > &
      Schema.Attribute.Required;
  };
}

export interface PagePlayYourRideFares extends Struct.ComponentSchema {
  collectionName: 'components_page_play_your_ride_fares';
  info: {
    displayName: 'Fares';
  };
  attributes: {
    actionButton: Schema.Attribute.Component<'content.action-button', false>;
    desc: Schema.Attribute.Text & Schema.Attribute.Required;
    fareItem: Schema.Attribute.Component<'content.fare-item', true>;
    monthlyTicketActionButton: Schema.Attribute.Component<
      'content.action-button',
      false
    >;
    priceAdult: Schema.Attribute.Decimal & Schema.Attribute.Required;
    priceChild: Schema.Attribute.Decimal & Schema.Attribute.Required;
    priceSenior: Schema.Attribute.Decimal & Schema.Attribute.Required;
    Title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PagePlayYourRideSchedule extends Struct.ComponentSchema {
  collectionName: 'components_page_play_your_ride_schedules';
  info: {
    displayName: 'Schedule';
  };
  attributes: {
    ScheduleWestBound: Schema.Attribute.Component<
      'content.schedule-westbound',
      false
    > &
      Schema.Attribute.Required;
    seheduleEastBound: Schema.Attribute.Component<
      'content.schedule-east-bound',
      false
    > &
      Schema.Attribute.Required;
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
    shareImage: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    structuredData: Schema.Attribute.JSON;
  };
}

export interface SharedIconEnum extends Struct.ComponentSchema {
  collectionName: 'components_shared_icon_enums';
  info: {
    displayName: 'Icon Enum';
    icon: 'bulletList';
  };
  attributes: {
    icon: Schema.Attribute.Enumeration<
      [
        'map',
        'calendar',
        'busket',
        'upRightArrow',
        'faq',
        'speaker',
        'direction',
        'clock',
      ]
    >;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'content.action-button': ContentActionButton;
      'content.arc-carousel-item': ContentArcCarouselItem;
      'content.attraction': ContentAttraction;
      'content.banner-image-unit': ContentBannerImageUnit;
      'content.carousel-item': ContentCarouselItem;
      'content.download-app-area': ContentDownloadAppArea;
      'content.fare-item': ContentFareItem;
      'content.footer': ContentFooter;
      'content.get-in-touch': ContentGetInTouch;
      'content.hyperlink': ContentHyperlink;
      'content.icon-list': ContentIconList;
      'content.image-link': ContentImageLink;
      'content.party-tram-item': ContentPartyTramItem;
      'content.schedule-basic-unit': ContentScheduleBasicUnit;
      'content.schedule-day': ContentScheduleDay;
      'content.schedule-east-bound': ContentScheduleEastBound;
      'content.schedule-westbound': ContentScheduleWestbound;
      'content.service-updates': ContentServiceUpdates;
      'content.souvenior-item': ContentSouveniorItem;
      'content.station-item': ContentStationItem;
      'content.tram-details-item': ContentTramDetailsItem;
      'content.tramoramic-tour-item': ContentTramoramicTourItem;
      'global.ext-link': GlobalExtLink;
      'global.main-nav-ext-link': GlobalMainNavExtLink;
      'media.banner-image': MediaBannerImage;
      'page-home.arc-carousel': PageHomeArcCarousel;
      'page-home.souvenior': PageHomeSouvenior;
      'page-home.tram-routes': PageHomeTramRoutes;
      'page-home.tramoramic-tour': PageHomeTramoramicTour;
      'page-play-your-ride.fares': PagePlayYourRideFares;
      'page-play-your-ride.schedule': PagePlayYourRideSchedule;
      'seo.seo': SeoSeo;
      'shared.icon-enum': SharedIconEnum;
    }
  }
}
