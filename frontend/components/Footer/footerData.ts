export type SocialPlatform = {
  name: string;
  icon: string;
  href: string | null;
};

/** Icon + display name per footer social link field. Hrefs come from CMS global.footer. */
export function socialPlatforms(footer: {
  fbLink: string | null;
  igLink: string | null;
  youtubeLink: string | null;
  redBookLink: string | null;
  weChatLink: string | null;
  weiBoLink: string | null;
  tripAdvLink: string | null;
}): SocialPlatform[] {
  return [
    { name: "Facebook", icon: "/footer/fb.svg", href: footer.fbLink },
    { name: "Instagram", icon: "/footer/ig.svg", href: footer.igLink },
    { name: "Youtube", icon: "/footer/yt.svg", href: footer.youtubeLink },
    { name: "Weibo", icon: "/footer/wb.svg", href: footer.weiBoLink },
    {
      name: "Tripadvisor",
      icon: "/footer/ta.svg",
      href: footer.tripAdvLink,
    },
    { name: "RedBook", icon: "/footer/redbook.svg", href: footer.redBookLink },
    { name: "WeChat", icon: "/footer/wechat.svg", href: footer.weChatLink },
  ].filter((social) => social.href);
}

export const paymentIcons = [
  "/footer/PayOctopus.svg",
  "/footer/PayCash.svg",
  "/footer/PayCard.svg",
  "/footer/PayMobile.svg",
  "/footer/PayQR.svg",
];
